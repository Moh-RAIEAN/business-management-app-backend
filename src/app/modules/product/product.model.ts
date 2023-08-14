import { Schema, Types, model } from 'mongoose';
import { IProduct, IProductModel } from './product.interface';

const ProductSchema = new Schema<IProduct, IProductModel>(
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
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    quantity: {
      type: Number,
      min: [1, 'quantity mustbe greater or equal to 1'],
      required: true,
    },
    isInStock: {
      type: Boolean,
      default: true,
      required: true,
    },
    isExpired: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = model<IProduct, IProductModel>('Product', ProductSchema);
