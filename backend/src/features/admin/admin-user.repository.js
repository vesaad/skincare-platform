const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAll = () => prisma.user.findMany({
  include: {
    userRoles: { include: { role: true } },
  },
  omit: { passwordHash: true },
});
const findById = (id) => prisma.user.findUnique({ where: { id } });
const updateStatus = (id, isActive) => prisma.user.update({
  where: { id },
  data: { isActive },
});
const deleteRoles = (userId) => prisma.userRole.deleteMany({ where: { userId } });
const createRole = (data) => prisma.userRole.create({ data });
const remove = (id) => prisma.user.delete({ where: { id } });
const findForExport = () => prisma.user.findMany({
  select: { id: true, firstName: true, lastName: true, email: true, isActive: true, createdAt: true },
});

module.exports = { findAll, findById, updateStatus, deleteRoles, createRole, remove, findForExport };
