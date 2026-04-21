const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const validateMiddleware = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validator');
const {
  register, login, refresh, logout, me
} = require('../controllers/auth.controller');

router.post('/register', validateMiddleware(registerSchema), register);
router.post('/login',    validateMiddleware(loginSchema), login);
router.post('/refresh',  refresh);
router.post('/logout',   logout);
router.get('/me',        authMiddleware, me);

module.exports = router;