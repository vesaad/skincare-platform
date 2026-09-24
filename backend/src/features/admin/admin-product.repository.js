const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAll = () => prisma.product.findMany();
const create = (data) => prisma.product.create({ data });
const update = (id, data) => prisma.product.update({ where: { id }, data });
const remove = (id) => prisma.product.delete({ where: { id } });
const findForExport = () => prisma.product.findMany({
  select: { id: true, name: true, price: true, createdAt: true },
});

module.exports = { findAll, create, update, remove, findForExport };
