import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { IReqAuth } from '../config/interface';
import UserModel from '../models/UserModel';

const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication.' });

    try {
      const { avatar, name } = req.body;

      await UserModel.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          name,
        }
      );

      res.json({ msg: 'Update Success!' });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication.' });

    if (req.user.type !== 'register')
      return res.status(400).json({
        msg: `Quick login account with ${req.user.type} can't use this function.`,
      });

    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await UserModel.findOneAndUpdate(
        { _id: req.user._id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: 'Reset Password Success!' });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
