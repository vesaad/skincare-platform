const repo = require("../repositories/product.repository");
const fs = require("fs");
const path = require("path");

let canonicalProductsById;

const getCanonicalProductsById = () => {
  if (canonicalProductsById) return canonicalProductsById;

  canonicalProductsById = new Map();
  const csvPath = path.join(__dirname, "../../../ml-service/skincare_100.csv");

  if (!fs.existsSync(csvPath)) return canonicalProductsById;

  const rows = fs.readFileSync(csvPath, "utf8").trim().split(/\r?\n/).slice(1);
  for (const row of rows) {
    const [id, productId, name, brand, category, price, ingredients] = row.split(",");
    if (!id) continue;

    canonicalProductsById.set(parseInt(id), {
      id: parseInt(id),
      productId: parseInt(productId),
      name: name?.trim(),
      brand: brand?.trim(),
      category: category?.trim(),
      price: parseFloat(price),
      ingredients: ingredients?.trim(),
      imageUrl: `/images/products/${id}.jpg`,
    });
  }

  return canonicalProductsById;
};

const normalizeProduct = (product) => {
  const canonical = getCanonicalProductsById().get(product.id);
  if (!canonical) return product;

  return {
    ...product,
    name: canonical.name || product.name,
    brand: canonical.brand || product.brand,
    category: canonical.category || product.category,
    price: Number.isNaN(canonical.price) ? product.price : canonical.price,
    ingredients: canonical.ingredients || product.ingredients,
    imageUrl: canonical.imageUrl,
  };
};

const sortProducts = (products, sort) => {
  return [...products].sort((a, b) => {
    const aValue = a[sort];
    const bValue = b[sort];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    }

    return String(aValue ?? "").localeCompare(String(bValue ?? ""));
  });
};

const paginateProducts = (products, page, limit) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  return products.slice(skip, skip + parseInt(limit));
};

const getAll = async (query) => {
  const { page = 1, limit = 20, category, brand, sort = "name" } = query;
  const products = (await repo.findAll({ where: {}, skip: 0, take: 1000 }))
    .map(normalizeProduct)
    .filter((product) => !category || product.category === category)
    .filter((product) => !brand || product.brand === brand);
  const sortedProducts = sortProducts(products, sort);

  return {
    products: paginateProducts(sortedProducts, page, limit),
    total: sortedProducts.length,
    page: parseInt(page),
    limit: parseInt(limit),
  };
};

const search = async (query) => {
  const { q = "", category, brand, skinType, minPrice, maxPrice, page = 1, limit = 20 } = query;
  const searchText = q.trim().toLowerCase();
  const min = minPrice ? parseFloat(minPrice) : null;
  const max = maxPrice ? parseFloat(maxPrice) : null;
  const products = (await repo.findAll({ where: {}, skip: 0, take: 1000 }))
    .map(normalizeProduct)
    .filter((product) => {
      if (!searchText) return true;

      return [product.name, product.brand, product.category, product.ingredients]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(searchText));
    })
    .filter((product) => !category || product.category === category)
    .filter((product) => !brand || product.brand === brand)
    .filter((product) => !skinType || product.skinType === skinType)
    .filter((product) => min === null || product.price >= min)
    .filter((product) => max === null || product.price <= max);

  return { products: paginateProducts(products, page, limit), total: products.length };
};

const getById = async (id) => {
  const product = await repo.findById(id);
  return product ? normalizeProduct(product) : product;
};
const create  = async (data)     => repo.create(data);
const update  = async (id, data) => repo.update(id, data);
const remove  = async (id)       => repo.remove(id);

module.exports = { getAll, search, getById, create, update, remove };
