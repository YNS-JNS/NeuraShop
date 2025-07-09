import { Router } from 'express';
import { productController } from '../../controllers/product.controller.js';

const router = Router();

// Routes publiques pour afficher la liste des produits
router.route('/').get(productController.getPublicProducts);

// Route pour voir le détail d'un produit, qui utilise maintenant le contrôleur public dédié
router.route('/:id').get(productController.getPublicProductDetails);

export default router;
