const router = require('express').Router();
const authMw = require('../middlewares/auth.middleware');
const c = require('../controllers/progress.controller');

router.post('/', authMw, c.createProgressLog);

module.exports = router;
