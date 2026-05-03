const repo = require("../repositories/product.repository");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAll = async (query) => {
  const { page = 1, limit = 20, category, brand, sort = "name" } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const where = {};
  if (category) where.categoryId = parseInt(category);
  if (brand) where.brandId = parseInt(brand);

  const [products, total] = await Promise.all([
    repo.findAll({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { [sort]: "asc" },
    }),
    repo.count(where),
  ]);
  return { products, total, page: parseInt(page), limit: parseInt(limit) };
};

const search = async (query) => {
  const {
    q = "",
    category,
    brand,
    minPrice,
    maxPrice,
    page = 1,
    limit = 20,
  } = query;
  const where = {};
  if (q) where.name = { contains: q, mode: "insensitive" };

  if (category) {
    const cat = await prisma.productCategory.findFirst({
      where: { name: category },
    });
    if (cat) where.categoryId = cat.id;
  }
  if (brand) {
    const br = await prisma.brand.findFirst({ where: { name: brand } });
    if (br) where.brandId = br.id;
  }
  if (minPrice) where.price = { gte: parseFloat(minPrice) };
  if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice) };

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [products, total] = await Promise.all([
    repo.findAll({ where, skip, take: parseInt(limit) }),
    repo.count(where),
  ]);
  return { products, total };
};

const getById = async (id) => repo.findById(id);
const create = async (data) => repo.create(data);
const update = async (id, data) => repo.update(id, data);
const remove = async (id) => repo.remove(id);

module.exports = { getAll, search, getById, create, update, remove };
