import express from 'express';
import CategoryController from '../controllers/CategoryController';
import auth from '../middleware/auth';

const router = express.Router();

router
  .route('/category')
  .get(CategoryController.getCategories)
  .post(auth, CategoryController.createCategory);

router
  .route('/category/:id')
  .patch(auth, CategoryController.updateCategory)
  .delete(auth, CategoryController.deleteCategory);

export default router;
