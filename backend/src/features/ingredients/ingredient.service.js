const repo = require('./ingredient.repository.js');

const getAll = () => repo.findAll();
const create = (data) => repo.create(data);

module.exports = { getAll, create };
