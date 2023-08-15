/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'mongoose';
// import { productCategoryConstants } from './productCategory.constants';

// const {FILTERS, SEACHABLE_FILEDS} = productCategoryConstants;

export type IProductCategory = {
  id?: string;
  name: string;
};

export type IProductCategoryModel = Model<
  IProductCategory,
  Record<string, unknown>
>;

export type IProductCategoryFilters = {
  [key: string]: string | undefined;
  searchTerm?: string;
  id?: string;
  name?: string;
};

export type ICategoryFilterResult = {
  $and: (
    | {
        [x: string]: boolean;
      }
    | {
        [x: string]: string | number | undefined;
      }
  )[];
};
