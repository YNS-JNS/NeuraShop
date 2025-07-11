import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();
router.use(verifyJWT);

router.route('/create-checkout-session').post(paymentController.createCheckoutSession);

export default router;
