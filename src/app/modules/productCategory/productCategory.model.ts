import { Schema, model } from 'mongoose';
import {
  IProductCategory,
  IProductCategoryModel,
} from './productCategory.interface';
import applyDefaultSchema from '../../../helpers/applyDefaultSchema';

const ProductCategorySchema = new Schema<
  IProductCategory,
  IProductCategoryModel
>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
applyDefaultSchema(ProductCategorySchema);

export const ProductCategory = model<IProductCategory, IProductCategoryModel>(
  'ProductCategory',
  ProductCategorySchema,
);
