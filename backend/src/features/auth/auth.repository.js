const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const createUser = async (data) => {
  return prisma.user.create({ data });
};

const findRoleByName = async (name) => {
  return prisma.role.findUnique({ where: { name } });
};

const assignRoleToUser = async (userId, roleId) => {
  return prisma.userRole.create({
    data: { userId, roleId }
  });
};

const saveRefreshToken = async (userId, tokenHash, expiresAt) => {
  return prisma.refreshToken.create({
    data: { userId, tokenHash, expiresAt }
  });
};

const findRefreshToken = async (tokenHash) => {
  return prisma.refreshToken.findFirst({
    where: { tokenHash, revokedAt: null }
  });
};

const revokeRefreshToken = async (tokenHash) => {
  return prisma.refreshToken.updateMany({
    where: { tokenHash },
    data: { revokedAt: new Date() }
  });
};

const findById = (id) => prisma.user.findUnique({ where: { id } });

const findByIdWithRoles = (id) => prisma.user.findUnique({
  where: { id },
  include: {
    userRoles: {
      include: { role: true }
    }
  }
});

module.exports = {
  findById,
  findByIdWithRoles,
  findByEmail,
  createUser,
  findRoleByName,
  assignRoleToUser,
  saveRefreshToken,
  findRefreshToken,
  revokeRefreshToken
};
