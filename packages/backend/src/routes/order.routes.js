import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

// Toutes les routes de commande nécessitent que l'utilisateur soit connecté
router.use(verifyJWT);

router.route('/').post(orderController.addOrderItems);

export default router;
