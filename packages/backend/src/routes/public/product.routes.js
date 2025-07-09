import { Router } from 'express';
import { productController } from '../../controllers/product.controller.js';

const router = Router();

// Routes publiques pour afficher les produits
router.route('/').get(productController.getPublicProducts);

// Route pour voir le détail d'un produit (on peut réutiliser le contrôleur admin)
router.route('/:id').get(productController.getAdminProductDetails);

export default router;
