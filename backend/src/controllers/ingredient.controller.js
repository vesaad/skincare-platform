const svc = require('../services/ingredient.service');

const getAll = async (req, res) => {
  try { res.json(await svc.getAll()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
const create = async (req, res) => {
  try { res.status(201).json(await svc.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

module.exports = { getAll, create };