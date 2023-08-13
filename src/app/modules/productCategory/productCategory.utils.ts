import { IProductCategoryFilters } from './productCategory.interface';
import { ProductCategory } from './productCategory.model';

const findMaxCategoryId = async (): Promise<string> => {
  const result = await ProductCategory.findOne({}).sort({ createdAt: -1 });
  return result ? result?.id : '0';
};

const generateCategoryId = (id: string): string => {
  const increamentedId: number = Number(id) + 1;
  const newId: string =
    increamentedId < 10 ? `0${increamentedId}` : `${increamentedId}`;
  return newId;
};

type IFilterResult = {
  $and: (
    | {
        [x: string]: boolean;
      }
    | {
        [x: string]: string | number | undefined;
      }
  )[];
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
