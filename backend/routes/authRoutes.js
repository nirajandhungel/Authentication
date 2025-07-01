import express from 'express';
import { loginController, signupController, logoutController } from '../controllers/authControllers.js';
import { adminDashboardController, clientDashboardController } from '../controllers/dashboardControllers.js';

const router = express.Router();

router.post('/login',loginController);
router.post('/signup',signupController);
router.post('/logout',logoutController);
router.post('/admin/dashboard',adminDashboardController);
router.post('/home',clientDashboardController);
export default router;