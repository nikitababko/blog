import { Request, Response } from 'express';
import CategoryModel from '../models/CategoryModel';
import { IReqAuth } from '../config/interface';

const CategoryController = {
  createCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(400).json({
        msg: 'Invalid Authentication.',
      });
    }

    try {
      const name = req.body.name.toLowerCase();

      const category = await CategoryModel.findOne({ name });

      const newCategory = new CategoryModel({ name });
      await newCategory.save();

      res.json({ newCategory });
    } catch (error: any) {
      let errMsg;
      if (error.code === 11000) {
        console.log(Object.values(error.keyValue));

        errMsg = Object.values(error.keyValue)[0] + ' already exists.';
      } else {
        let name = Object.keys(error.errors)[0];
        errMsg = error.errors[`${name}`].message;
      }

      return res.status(500).json({
        msg: errMsg,
      });
    }
  },

  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await CategoryModel.find().sort('-createdAt');
      res.json({ categories });
    } catch (error: any) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  updateCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(400).json({
        msg: 'Invalid Authentication.',
      });
    }

    try {
      const category = await CategoryModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { name: req.body.name }
      );

      res.json({ msg: 'Update Success!' });
    } catch (error: any) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  deleteCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(400).json({
        msg: 'Invalid Authentication.',
      });
    }

    try {
      const category = await CategoryModel.findByIdAndRemove({
        _id: req.params.id,
      });

      res.json({ msg: 'Delete Success!' });
    } catch (error: any) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },
};

export default CategoryController;
