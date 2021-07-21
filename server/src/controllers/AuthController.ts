import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/UserModel';
import { generateActiveToken } from '../config/generateToken';
import sendMail from '../config/sendMail';
import { validateEmail, validPhone } from '../middleware/valid';
import { sendSMS } from '../config/sendSMS';
import { IDecodedToken } from '../config/interface';

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
        return res.json({ message: 'Success! Please check your email.' });
      } else if (validPhone(account)) {
        sendSMS(account, url, 'Verify your phone number');
        return res.json({ message: 'Success! Please check your phone.' });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );

      const { newUser } = decoded;

      if (!newUser)
        return res
          .status(400)
          .json({ message: 'Invalid authentication.' });

      const user = new UserModel(newUser);

      await user.save();

      res.json({ message: 'Account has been activated!' });
    } catch (error) {
      let errorMessage;

      if (error.code === 11000) {
        errorMessage = Object.keys(error.keyValue)[0] + ' already exists.';
      } else {
        let name = Object.keys(error.errors)[0];
        errorMessage = error.errors[`${name}`].message;
      }

      return res.status(500).json({ message: errorMessage });
    }
  },
};

export default AuthController;
