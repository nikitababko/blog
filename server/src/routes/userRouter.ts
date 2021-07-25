import express from 'express';
import auth from '../middleware/auth';
import UserController from '../controllers/UserController';

const router = express.Router();

router.patch('/user', auth, UserController.updateUser);

router.patch('/reset_password', auth, UserController.resetPassword);

export default router;
