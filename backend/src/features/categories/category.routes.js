const router = require('express').Router();
const authMw = require('../../middleware/auth.middleware.js');
const roleMw = require('../../middleware/role.middleware.js');
const c      = require('./category.controller.js');

router.get('/',  c.getAll);
router.post('/', authMw, roleMw('Admin'), c.create);

module.exports = router;
