import { Router } from 'express';
import { productController } from '../../controllers/product.controller.js';
import { verifyJWT, authorizeRoles } from '../../middleware/auth.middleware.js';
import { upload } from '../../middleware/multer.middleware.js';

const router = Router();

// Appliquer les middlewares de sécurité à TOUTES les routes de ce fichier
router.use(verifyJWT, authorizeRoles('admin'));

// Routes CRUD complètes pour les produits côté admin
// Toutes les routes CRUD sont maintenant protégées.
// Seul un utilisateur authentifié avec le rôle "admin" peut y accéder.

// La route de création de produit utilise le middleware d'upload
router.route('/')
  .post(
    upload.fields([{ name: 'images', maxCount: 5 }]), // Accepte jusqu'à 5 fichiers dans le champ 'images'
    productController.createAdminProduct
  )
  .get(productController.getAdminProducts);

router
  .route('/:id')
  .get(productController.getAdminProductDetails)
  .put(productController.updateAdminProduct)
  .delete(productController.deleteAdminProduct);

export default router;
