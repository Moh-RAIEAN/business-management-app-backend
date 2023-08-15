/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGenericResult } from '../../../interfaces/response.interface';
import { IProduct, IProductFilters } from './product.interface';
import { Product } from './product.model';
import { ProductContants } from './product.constants';
import { ProductUtils } from './product.uitils';
import handlePagination from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions';
import { FilterQuery } from 'mongoose';
import ApiError from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const getProducts = async (
  productFilters: IProductFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResult<IProduct[]>> => {
  // handle database query
  const { searchTerm, ...otherFilters } = productFilters;
  const { SEACHABLE_FILEDS } = ProductContants;
  const searchCondition: { [key: string]: unknown } = {};
  if (searchTerm) {
    searchCondition.$or = SEACHABLE_FILEDS.map((field) => {
      return { [field]: { $regex: searchTerm, $options: 'i' } };
    });
  }

  const filtersCondition = ProductUtils.handleProductFilters(otherFilters);
  const searchQuery = {
    $and: [
      searchCondition,
      filtersCondition.$and.length ? filtersCondition : {},
    ],
  };
  // handle pagination
  const { page, skip, limit, sortBy, sortOrder } =
    handlePagination(paginationOptions);

  const result = await Product.find(searchQuery as FilterQuery<IProduct>)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const total = await Product.find(
    searchQuery as FilterQuery<IProduct>,
  ).count();
  return {
    message: 'Products retirved successfully!',
    meta: { page, limit, total },
    data: result,
  };
};

const getProduct = async (id: string): Promise<IGenericResult<IProduct>> => {
  const result = await Product.findById(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
  return {
    message: 'Product retrived successfully!',
    data: result,
  };
};
export const ProductService = { getProducts, getProduct };
