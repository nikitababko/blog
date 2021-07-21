import { Schema, Types, model } from 'mongoose';
import { IUser } from '../config/interface';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true,
      maxLength: [20, 'Your name is up to 20 chars long.'],
    },

    account: {
      type: String,
      required: [true, 'Please add your email or phone'],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Please add your password'],
    },

    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/nikitababko/image/upload/v1616588775/Avatars/avatar_g5b8fp.png',
    },

    role: {
      type: String,
      default: 'user',
    },

    type: {
      type: String,
      default: 'register',
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>('User', UserSchema);
