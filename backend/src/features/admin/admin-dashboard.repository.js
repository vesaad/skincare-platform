const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const countUsers = () => prisma.user.count();
const countActiveUsers = () => prisma.user.count({ where: { isActive: true } });
const countProducts = () => prisma.product.count();
const groupProductsByCategory = () => prisma.product.groupBy({
  by: ['category'],
  _count: { id: true },
  orderBy: { _count: { id: 'desc' } },
  take: 6,
});

module.exports = { countUsers, countActiveUsers, countProducts, groupProductsByCategory };
