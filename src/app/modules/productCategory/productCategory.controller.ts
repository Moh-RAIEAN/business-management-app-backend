/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductCategoryService } from './productCategory.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../helpers/sendResponse';
import { IProductCategoryFilters } from './productCategory.interface';
import { productCategoryConstants } from './productCategory.constants';
import pick from '../../../helpers/pick';
import { commonConstants } from '../../../constants/common.constants';
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions';

const getProductCategories = catchAsync(async (req, res) => {
  const { FILTERS } = productCategoryConstants;
  const { PAGINATION_OPTIONS } = commonConstants;
  const productCategoryFilters = pick(
    req.query,
    FILTERS,
  ) as IProductCategoryFilters;
  const paginationOptions = pick(
    req.query,
    PAGINATION_OPTIONS,
  ) as unknown as IPaginationOptions;
  const result = await ProductCategoryService.getProductCategories(
    productCategoryFilters,
    paginationOptions,
  );
  sendResponse(res, result);
});

const getProductCategory = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const result = await ProductCategoryService.getProductCategory(id);
  sendResponse(res, result);
});

export const ProductCategoryController = {
  getProductCategories,
  getProductCategory,
};
