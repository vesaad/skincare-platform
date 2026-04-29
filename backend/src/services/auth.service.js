const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authRepo = require('../repositories/auth.repository');

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = crypto.randomBytes(64).toString('hex');
  return { accessToken, refreshToken };
};

const register = async ({ email, password, firstName, lastName }) => {
  const exists = await authRepo.findByEmail(email);
  if (exists) throw new Error('Ky email ekziston tashmë');

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await authRepo.createUser({
    email,
    passwordHash,
    firstName,
    lastName
  });

  // Cakto rolin "User" automatikisht
  const userRole = await authRepo.findRoleByName('User');
  if (userRole) {
    await authRepo.assignRoleToUser(user.id, userRole.id);
  }

  return { message: 'Regjistrimi u krye me sukses', userId: user.id };
};

const login = async ({ email, password }) => {
  const user = await authRepo.findByEmail(email);
  if (!user) throw new Error('Email ose fjalëkalim i gabuar');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Email ose fjalëkalim i gabuar');

  const { accessToken, refreshToken } = generateTokens(user);

  // Ruaj refresh token në DB
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 ditë
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await authRepo.saveRefreshToken(user.id, tokenHash, expiresAt);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName
    }
  };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) throw new Error('Refresh token mungon');

  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const saved = await authRepo.findRefreshToken(tokenHash);

  if (!saved) throw new Error('Refresh token invalid');
  if (new Date() > saved.expiresAt) throw new Error('Refresh token ka skaduar');

  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id: saved.userId } });

  const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

  // Revoko token-in e vjetër dhe ruaj të riun
  await authRepo.revokeRefreshToken(tokenHash);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const newTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
  await authRepo.saveRefreshToken(user.id, newTokenHash, expiresAt);

  return { accessToken, refreshToken: newRefreshToken };
};

const logout = async (refreshToken) => {
  if (!refreshToken) throw new Error('Refresh token mungon');
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await authRepo.revokeRefreshToken(tokenHash);
  return { message: 'Logout u krye me sukses' };
};

module.exports = { register, login, refresh, logout };