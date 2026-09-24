const routineRepository = require('./routine.repository');

const saveRoutine = async (userId, routineType, products) => {
  await routineRepository.deactivateRoutines(userId);
  return routineRepository.create({
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
  });
};

const getActiveRoutine = (userId) => routineRepository.findActive(userId);

module.exports = { saveRoutine, getActiveRoutine };
