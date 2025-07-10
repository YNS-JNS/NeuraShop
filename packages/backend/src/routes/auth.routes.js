import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';

const router = Router();

// Route pour l'inscription : POST /api/v1/auth/register
// On valide les données avant de les passer au contrôleur.
router.route('/register').post(validate(registerSchema), authController.register);

// Route pour la connexion : POST /api/v1/auth/login
router.route('/login').post(validate(loginSchema), authController.login);

// Route pour la déconnexion : POST /api/v1/auth/logout
router.route('/logout').post(authController.logout);

export default router;
