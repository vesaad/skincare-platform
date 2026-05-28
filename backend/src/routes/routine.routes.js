const router = require('express').Router();
const authMw = require('../middlewares/auth.middleware');
const c = require('../controllers/routine.controller');

router.get('/active', authMw, c.getActiveRoutine);
router.post('/', authMw, c.saveRoutine);

module.exports = router;
