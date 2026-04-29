const svc = require('../services/product.service');

const getAll = async (req, res) => {
  try { res.json(await svc.getAll(req.query)); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

const search = async (req, res) => {
  try { res.json(await svc.search(req.query)); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

const getById = async (req, res) => {
  try {
    const p = await svc.getById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Produkti nuk u gjet' });
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const create = async (req, res) => {
  try { res.status(201).json(await svc.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const update = async (req, res) => {
  try { res.json(await svc.update(req.params.id, req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const remove = async (req, res) => {
  try { await svc.remove(req.params.id); res.json({ message: 'U fshi' }); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

module.exports = { getAll, search, getById, create, update, remove };
