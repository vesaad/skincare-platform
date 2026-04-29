const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAll = () => prisma.productCategory.findMany();
const create  = (data) => prisma.productCategory.create({ data });

module.exports = { findAll, create };