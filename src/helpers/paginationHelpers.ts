import { IPaginationOptions } from '../interfaces/common.interface';

const handlePagination = (
  paginationOptions: IPaginationOptions,
): IPaginationOptions => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'asc',
    total = 0,
  } = paginationOptions;
  const skip = (page - 1) * limit;
  const newPaginationOptions: IPaginationOptions = {
    page: Number(page),
    limit: Number(limit),
    skip,
    sortBy,
    sortOrder,
    total,
  };
  return newPaginationOptions;
};

export default handlePagination;
