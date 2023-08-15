/* eslint-disable @typescript-eslint/no-unused-vars */
// import { commonConstants } from '../../../constants/common.constants';
import { StatusCodes } from 'http-status-codes';
import handlePagination from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions';
import { IGenericResult } from '../../../interfaces/response.interface';
import { productCategoryConstants } from './productCategory.constants';
import {
  IProductCategory,
  IProductCategoryFilters,
} from './productCategory.interface';
import { ProductCategory } from './productCategory.model';
import { productCategoryUtils } from './productCategory.utils';
import ApiError from '../../errors/ApiError';

const getProductCategories = async (
  filters: IProductCategoryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResult<IProductCategory[]>> => {
  // handle database query
  const { searchTerm, ...otherFilters } = filters;
  const { SEACHABLE_FILEDS } = productCategoryConstants;
  const searchCondition: { [key: string]: unknown } = {};
  if (searchTerm) {
    searchCondition.$or = SEACHABLE_FILEDS.map((field: string) => {
      return { [field]: { $regex: searchTerm, $options: 'i' } };
    });
  }

  // handle filter
  const filtersCondition =
    productCategoryUtils.handleProductCagegoryFilters(otherFilters);

  const serachQuery = {
    $and: [
      searchCondition,
      filtersCondition.$and.length ? filtersCondition : {},
    ],
  };

  // handle pagination
  const { page, skip, limit, sortBy, sortOrder } =
    handlePagination(paginationOptions);
  const result = await ProductCategory.find(serachQuery)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const total = await ProductCategory.find(serachQuery)
    .sort({ [sortBy]: sortOrder })
    .count();

  return {
    message: 'categories retrived successfully!',
    meta: { page, limit, total },
    data: result,
  };
};

const getProductCategory = async (
  id: string,
): Promise<IGenericResult<IProductCategory>> => {
  const result = await ProductCategory.findById(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
  return {
    message: 'category retrived successfully!',
    data: result,
  };
};

export const ProductCategoryService = {
  getProductCategories,
  getProductCategory,
};
