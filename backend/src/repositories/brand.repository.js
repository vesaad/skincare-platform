const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAll = () => prisma.brand.findMany({ include: { products: true } });
const create  = (data) => prisma.brand.create({ data });

module.exports = { findAll, create };