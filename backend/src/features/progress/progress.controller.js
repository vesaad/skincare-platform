const progressService = require('./progress.service');

const createProgressLog = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { routineId, rating, notes } = req.body;

    if (!routineId) {
      return res.status(400).json({ error: 'routineId is required' });
    }

    const log = await progressService.createProgressLog(userId, { routineId, rating, notes });

    res.status(201).json(log);
  } catch (err) {
    console.error('Progress log error:', err.message);
    res.status(400).json({ error: err.message || 'Could not save progress log' });
  }
};

module.exports = { createProgressLog };
