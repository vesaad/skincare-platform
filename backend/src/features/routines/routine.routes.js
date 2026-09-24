const router = require('express').Router();
const authMw = require('../../middleware/auth.middleware.js');
const c = require('./routine.controller.js');

router.get('/active', authMw, c.getActiveRoutine);
router.post('/', authMw, c.saveRoutine);

module.exports = router;
