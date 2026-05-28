const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const saveRoutine = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { routineType, products } = req.body;

    if (!routineType || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'routineType and products are required' });
    }

    await prisma.routine.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    const routine = await prisma.routine.create({
      data: {
        userId,
        type: routineType,
        name: routineType,
        isActive: true,
        routineSteps: {
          create: products.map((p, index) => ({
            productId: p.product_id,
            stepOrder: index + 1,
            timeOfDay: 'Daily',
            instructions: p.step || null,
          })),
        },
      },
      include: {
        routineSteps: {
          include: { product: true },
          orderBy: { stepOrder: 'asc' },
        },
      },
    });

    res.status(201).json(routine);
  } catch (err) {
    console.error('Save routine error:', err.message);
    res.status(400).json({ error: err.message || 'Could not save routine' });
  }
};

const getActiveRoutine = async (req, res) => {
  try {
    const routine = await prisma.routine.findFirst({
      where: { userId: req.user.userId, isActive: true },
      include: {
        routineSteps: {
          include: { product: true },
          orderBy: { stepOrder: 'asc' },
        },
        progressLogs: { orderBy: { loggedAt: 'desc' }, take: 10 },
      },
      orderBy: { generatedAt: 'desc' },
    });
    res.json(routine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { saveRoutine, getActiveRoutine };
