const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAll = async ({ where={}, skip=0, take=20, orderBy={name:'asc'} }) => {
  return prisma.product.findMany({
    where, skip, take, orderBy,
    include: {
      brand:    true,
      category: true,
      productIngredients: { include: { ingredient: true } }
    }
  });
};

const findById = async (id) => {
  return prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      brand:    true,
      category: true,
      productIngredients: { include: { ingredient: true } }
    }
  });
};

const count  = async (where={}) => prisma.product.count({ where });
const create = async (data)     => prisma.product.create({ data });
const update = async (id, data) => prisma.product.update({ where: { id: parseInt(id) }, data });
const remove = async (id)       => prisma.product.delete({ where: { id: parseInt(id) } });

module.exports = { findAll, findById, count, create, update, remove };