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

export const ProductUtils = { findMaxProductId, generateProductId };
