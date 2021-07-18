import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/UserModel';
import { generateActiveToken } from '../config/generateToken';

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

      res.json({
        status: 'OK',
        message: 'Register succesfully.',
        data: newUser,
        active_token,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default AuthController;
