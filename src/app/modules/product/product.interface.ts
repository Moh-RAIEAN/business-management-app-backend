/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Types } from 'mongoose';
import { IProductCategory } from '../productCategory/productCategory.interface';

export type IProduct = {
  id: string;
  name: string;
  price: number;
  category: Types.ObjectId | IProductCategory;
  quantity: number;
  isInStock: boolean;
  isExpired: boolean;
};

export type IProductModel = Model<IProduct, Record<string, unknown>>;
