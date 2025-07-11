import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();
router.use(verifyJWT);

// La route du webhook n'est plus ici, elle est déclarée directement dans app.js
router.route('/create-checkout-session').post(paymentController.createCheckoutSession);

export default router;
