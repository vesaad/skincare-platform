const router = require('express').Router();
const authMw = require('../../middleware/auth.middleware.js');
const c = require('./progress.controller.js');

router.post('/', authMw, c.createProgressLog);

module.exports = router;
