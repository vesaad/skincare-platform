const repo = require("../repositories/product.repository");

const getAll = async (query) => {
  const { page = 1, limit = 20, category, brand, sort = "name" } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const where = {};
  if (category) where.category = category;
  if (brand)    where.brand    = brand;
  const [products, total] = await Promise.all([
    repo.findAll({ where, skip, take: parseInt(limit), orderBy: { [sort]: "asc" } }),
    repo.count(where),
  ]);
  return { products, total, page: parseInt(page), limit: parseInt(limit) };
};

const search = async (query) => {
  const { q = "", category, brand, skinType, minPrice, maxPrice, page = 1, limit = 20 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const where = {};
  if (q)        where.name     = { contains: q, mode: "insensitive" };
  if (category) where.category = category;
  if (brand)    where.brand    = brand;
  if (skinType) where.skinType = skinType;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }
  const [products, total] = await Promise.all([
    repo.findAll({ where, skip, take: parseInt(limit) }),
    repo.count(where),
  ]);
  return { products, total };
};

const getById = async (id) => repo.findById(id);
const create  = async (data)     => repo.create(data);
const update  = async (id, data) => repo.update(id, data);
const remove  = async (id)       => repo.remove(id);

module.exports = { getAll, search, getById, create, update, remove };