const progressRepository = require('./progress.repository');

const createProgressLog = (userId, { routineId, rating, notes }) =>
  progressRepository.create({
    userId,
    routineId: parseInt(routineId, 10),
    rating: rating != null ? parseInt(rating, 10) : null,
    notes: notes || null,
  });

module.exports = { createProgressLog };
