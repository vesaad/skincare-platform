const productRepository = require('./admin-product.repository');
const { Parser } = require('json2csv');

const getAll = () => productRepository.findAll();
const create = (data) => productRepository.create(data);
const update = (id, data) => productRepository.update(parseInt(id), data);
const remove = (id) => productRepository.remove(parseInt(id));

const exportProducts = async () => {
  const products = await productRepository.findForExport();
  const parser = new Parser();
  return parser.parse(products);
};

module.exports = { getAll, create, update, remove, exportProducts };
