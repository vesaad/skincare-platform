const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAll = () => prisma.ingredient.findMany();
const create  = (data) => prisma.ingredient.create({ data });

module.exports = { findAll, create };