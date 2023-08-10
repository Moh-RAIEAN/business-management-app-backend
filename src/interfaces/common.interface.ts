import { SortOrder } from 'mongoose';

export type IName = {
  firstName: string;
  lastName: string;
};

export type IPaginationOptions = {
  page: number;
  total: number;
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
};
export type IPagination = {
  [key: string]: string | number;
  page: number;
  total?: number;
  skip: number;
  limit: number;
};
