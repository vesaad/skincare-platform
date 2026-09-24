const routineService = require('./routine.service');

const saveRoutine = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { routineType, products } = req.body;

    if (!routineType || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'routineType and products are required' });
    }

    const routine = await routineService.saveRoutine(userId, routineType, products);

    res.status(201).json(routine);
  } catch (err) {
    console.error('Save routine error:', err.message);
    res.status(400).json({ error: err.message || 'Could not save routine' });
  }
};

const getActiveRoutine = async (req, res) => {
  try {
    const routine = await routineService.getActiveRoutine(req.user.userId);
    res.json(routine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { saveRoutine, getActiveRoutine };
