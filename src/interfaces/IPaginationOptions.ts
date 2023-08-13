import { SortOrder } from 'mongoose';

export type IPaginationOptions = {
  page: number;
  total: number;
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
};
