const router  = require('express').Router();
const authMw  = require('../middlewares/auth.middleware');
const roleMw  = require('../middlewares/role.middleware');
const c       = require('../controllers/product.controller');

// Publike - te gjitha mund ti shohin
router.get('/',       c.getAll);
router.get('/search', c.search);
router.get('/:id',    c.getById);

// Vetem Admin
router.post('/',      authMw, roleMw('Admin'), c.create);
router.put('/:id',    authMw, roleMw('Admin'), c.update);
router.delete('/:id', authMw, roleMw('Admin'), c.remove);

module.exports = router;