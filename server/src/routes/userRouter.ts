import express from 'express';
import auth from '../middleware/auth';
import UserController from '../controllers/UserController';

const router = express.Router();

router.patch('/user', auth, UserController.updateUser);

export default router;
