import { Router } from 'express';
import * as tagController from '../../controllers/tag.controller.js';
import { verifyJWT, authorizeRoles } from '../../middleware/auth.middleware.js';

const router = Router();

// Protégé et réservé aux admins
router.use(verifyJWT, authorizeRoles('admin'));

router.route('/').post(tagController.createTag).get(tagController.getAllTags);

router
  .route('/:id')
  .get(tagController.getTag)
  .put(tagController.updateTag)
  .delete(tagController.deleteTag);

export default router;
