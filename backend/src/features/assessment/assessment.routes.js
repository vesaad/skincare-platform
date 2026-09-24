const router = require('express').Router();
const authMw = require('../../middleware/auth.middleware.js');
const c = require('./assessment.controller.js');

router.post('/', authMw, c.assess);

module.exports = router;
