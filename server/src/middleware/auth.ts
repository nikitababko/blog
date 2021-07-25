import { Response, NextFunction } from 'express';
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import { IDecodedToken, IReqAuth } from '../config/interface';

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');

    if (!token)
      return res.status(400).json({ msg: 'Invalid Authentication.' });

    const decoded = <IDecodedToken>(
      jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    );
    if (!decoded)
      return res.status(400).json({ msg: 'Invalid Authentication.' });

    const user = await UserModel.findOne({ _id: decoded.id });
    if (!user)
      return res.status(400).json({ msg: 'User does not exist.' });

    req.user = user;

    next();
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;
