import {
  IFilterResult,
  IProductCategoryFilters,
} from './productCategory.interface';
import { ProductCategory } from './productCategory.model';

const findMaxCategoryId = async (): Promise<string> => {
  const result = await ProductCategory.findOne({}).sort({ createdAt: -1 });
  // ex: CT-01 -> 01
  return result ? result?.id?.split('-')[1] : '0';
};

const generateCategoryId = (id: string): string => {
  const increamentedId: number = Number(id) + 1;
  const newId: string = `CT-${
    increamentedId < 10 ? `0${increamentedId}` : increamentedId
  }`;
  return newId;
};

const handleProductCagegoryFilters = (
  productCategoryFilters: IProductCategoryFilters,
): IFilterResult => {
  const filtersConditionKeys = Object.keys(productCategoryFilters);
  return {
    $and: filtersConditionKeys.map((filterKey) => {
      return { [filterKey]: productCategoryFilters[filterKey] };
    }),
  };
};

export const productCategoryUtils = {
  findMaxCategoryId,
  generateCategoryId,
  handleProductCagegoryFilters,
};
