const repo = require('../repositories/category.repository');

const getAll = () => repo.findAll();
const create = (data) => repo.create(data);

module.exports = { getAll, create };