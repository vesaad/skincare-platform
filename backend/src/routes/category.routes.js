const router = require('express').Router();
const authMw = require('../middlewares/auth.middleware');
const roleMw = require('../middlewares/role.middleware');
const c      = require('../controllers/category.controller');

router.get('/',  c.getAll);
router.post('/', authMw, roleMw('Admin'), c.create);

module.exports = router;