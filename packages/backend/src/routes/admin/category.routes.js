import { Router } from 'express';
import * as categoryController from '../../controllers/category.controller.js';
import { verifyJWT, authorizeRoles } from '../../middleware/auth.middleware.js';

const router = Router();

// Toutes ces routes sont protégées et réservées aux admins
router.use(verifyJWT, authorizeRoles('admin'));

router.route('/').post(categoryController.createCategory).get(categoryController.getAllCategories);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
