const router = require('express').Router();
const authMiddleware = require('../../middleware/auth.middleware.js');
const validateMiddleware = require('../../middleware/validate.middleware.js');
const { registerSchema, loginSchema } = require('./auth.validator.js');
const {
  register, login, refresh, logout, me
} = require('./auth.controller.js');

router.post('/register', validateMiddleware(registerSchema), register);
router.post('/login',    validateMiddleware(loginSchema), login);
router.post('/refresh',  refresh);
router.post('/logout',   logout);
router.get('/me',        authMiddleware, me);

module.exports = router;
