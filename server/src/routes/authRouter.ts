import express from 'express';
import AuthController from '../controllers/AuthController';
import { validRegister } from '../middleware/valid';

const router = express.Router();

router.post('/register', validRegister, AuthController.register);

router.post('/active', AuthController.activeAccount);

router.post('/login', AuthController.login);

router.get('/logout', AuthController.logout);

router.get('/refresh_token', AuthController.refreshToken);

router.post('/google_login', AuthController.googleLogin);

router.post('/facebook_login', AuthController.facebookLogin);

export default router;
