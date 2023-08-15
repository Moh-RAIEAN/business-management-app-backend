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

export type IProductFilters = {
  [key: string]: string | boolean | undefined | number;
  searchTerm?: string;
  isInStock?: boolean;
  min?: number;
  max?: number;
  category?: string;
};

export type IProductFilterResult = {
  $and: (
    | {
        [x: string]: {
          $lte: number;
        };
      }
    | {
        [x: string]: {
          $gte: number;
        };
      }
    | {
        [x: string]: string | number | boolean | undefined;
      }
  )[];
};
