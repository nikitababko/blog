import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/UserModel';
import { generateActiveToken } from '../config/generateToken';
import sendMail from '../config/sendMail';
import { validateEmail } from '../middleware/valid';

const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await UserModel.findOne({ account });

      if (user) {
        return res.status(400).json({
          message: 'Email or phone number already exists.',
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash,
      };

      const active_token = generateActiveToken({ newUser });

      const CLIENT_URL = `${process.env.CLIENT_URL}`;
      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        sendMail(account, url, 'Verify your email address.');
        return res.json({ msg: 'Success! Please check your email.' });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default AuthController;
