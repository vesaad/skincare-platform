const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deactivateRoutines = (userId) => prisma.routine.updateMany({
  where: { userId, isActive: true },
  data: { isActive: false },
});

const create = (data) => prisma.routine.create({
  data,
  include: {
    routineSteps: {
      include: { product: true },
      orderBy: { stepOrder: 'asc' },
    },
  },
});

const findActive = (userId) => prisma.routine.findFirst({
  where: { userId, isActive: true },
  include: {
    routineSteps: {
      include: { product: true },
      orderBy: { stepOrder: 'asc' },
    },
    progressLogs: { orderBy: { loggedAt: 'desc' }, take: 10 },
  },
  orderBy: { generatedAt: 'desc' },
});

module.exports = { deactivateRoutines, create, findActive };
