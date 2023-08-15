import { ProductContants } from './product.constants';
import { IProductFilterResult, IProductFilters } from './product.interface';
import { Product } from './product.model';

const findMaxProductId = async (): Promise<string> => {
  const result = await Product.findOne({}).sort({ createdAt: -1 });
  // ex: P-01:01 -> 01
  return result ? result?.id?.split(':')[1] : '0';
};

const generateProductId = (id: string, categoryId: string): string => {
  const increamentedId: number = Number(id) + 1;
  const catergoryIdDigit = categoryId.split('-')[1];
  const newId: string = `P-${catergoryIdDigit}:${
    increamentedId < 10 ? `0${increamentedId}` : increamentedId
  }`;
  return newId;
};

const handleProductFilters = (
  productFilters: IProductFilters,
): IProductFilterResult => {
  const [, , MAX, MIN, IS_IN_STOCK] = ProductContants.FILTERS;
  const filtersConditionKeys = Object.keys(productFilters);
  return {
    $and: filtersConditionKeys.map((filterKey) => {
      let filter;
      if (filterKey === MAX) {
        filter = {
          ['price']: { $lte: Number(productFilters[filterKey]) },
        };
      } else if (filterKey === MIN) {
        filter = {
          ['price']: { $gte: Number(productFilters[filterKey]) },
        };
      } else if (filterKey === IS_IN_STOCK) {
        filter = {
          [`${filterKey}`]: Boolean(Number(productFilters[filterKey])),
        };
      } else {
        filter = {
          [`${filterKey}`]: productFilters[filterKey],
        };
      }
      return filter;
    }),
  };
};
export const ProductUtils = {
  findMaxProductId,
  generateProductId,
  handleProductFilters,
};
