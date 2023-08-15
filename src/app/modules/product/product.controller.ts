/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductService } from './product.service';
import { IProductFilters } from './product.interface';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../helpers/sendResponse';
import { commonConstants } from '../../../constants/common.constants';
import { ProductContants } from './product.constants';
import pick from '../../../helpers/pick';
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions';

const getProducts = catchAsync(async (req, res) => {
  const { PAGINATION_OPTIONS } = commonConstants;
  const { FILTERS } = ProductContants;
  const productFilters = pick(req.query, FILTERS) as IProductFilters;
  const paginationOptions = pick(
    req.query,
    PAGINATION_OPTIONS,
  ) as unknown as IPaginationOptions;
  const result = await ProductService.getProducts(
    productFilters,
    paginationOptions,
  );
  sendResponse(res, result);
});

const getProduct = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const result = await ProductService.getProduct(id);
  sendResponse(res, result);
});
export const ProductController = { getProducts, getProduct };
