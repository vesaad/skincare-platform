const router = require('express').Router();
const authMw = require('../middlewares/auth.middleware');
const c = require('../controllers/assessment.controller');

router.post('/', authMw, c.assess);

module.exports = router;
