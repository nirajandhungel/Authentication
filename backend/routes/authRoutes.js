import express from 'express';
import { loginController, signupController, logoutController } from '../controllers/authControllers.js';
import { adminDashboardController, clientDashboardController } from '../controllers/dashboardControllers.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login',loginController);
router.post('/signup',signupController);
router.post('/logout',logoutController);
router.post('/admin/dashboard',protect,protectAdmin, adminDashboardController);
router.post('/home',protect,clientDashboardController);
export default router;