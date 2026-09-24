const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = (data) => prisma.progressLog.create({ data });

module.exports = { create };
