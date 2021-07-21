import express from 'express';
import AuthController from '../controllers/AuthController';
import { validRegister } from '../middleware/valid';

const router = express.Router();

router.post('/register', validRegister, AuthController.register);

router.post('/active', AuthController.activeAccount);

export default router;
