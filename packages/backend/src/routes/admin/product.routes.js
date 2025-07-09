import { Router } from 'express';
import { productController } from '../../controllers/product.controller.js';

const router = Router();

// Routes CRUD complètes pour les produits côté admin
router
  .route('/')
  .post(productController.createAdminProduct)
  .get(productController.getAdminProducts);

router
  .route('/:id')
  .get(productController.getAdminProductDetails)
  .put(productController.updateAdminProduct)
  .delete(productController.deleteAdminProduct);

export default router;
