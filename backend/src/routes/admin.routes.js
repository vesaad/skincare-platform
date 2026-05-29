const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const adminUserController = require('../controllers/admin/adminUser.controller');
const adminProductController = require('../controllers/admin/adminProduct.controller');
const adminDashboardController = require('../controllers/admin/adminDashboard.controller');

router.use(authMiddleware);
router.use(roleMiddleware('Admin'));

// Dashboard stats
router.get('/stats', adminDashboardController.getStats);

// Users
router.get('/users', adminUserController.getAll);
router.put('/users/:id/status', adminUserController.toggleStatus);
router.put('/users/:id/role', adminUserController.assignRole);
router.delete('/users/:id', adminUserController.deleteUser);

// Products
router.get('/products', adminProductController.getAll);
router.post('/products', adminProductController.create);
router.put('/products/:id', adminProductController.update);
router.delete('/products/:id', adminProductController.delete);

// Export
router.get('/export/users', adminUserController.exportUsers);
router.get('/export/products', adminProductController.exportProducts);

module.exports = router;