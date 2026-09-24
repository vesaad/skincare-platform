const router  = require('express').Router();
const authMw  = require('../../middleware/auth.middleware.js');
const roleMw  = require('../../middleware/role.middleware.js');
const c       = require('./product.controller.js');

// Publike - te gjitha mund ti shohin
router.get('/',       c.getAll);
router.get('/search', c.search);
router.get('/:id',    c.getById);

// Vetem Admin
router.post('/',      authMw, roleMw('Admin'), c.create);
router.put('/:id',    authMw, roleMw('Admin'), c.update);
router.delete('/:id', authMw, roleMw('Admin'), c.remove);

module.exports = router;
