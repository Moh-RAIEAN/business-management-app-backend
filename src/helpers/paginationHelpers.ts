import { IPaginationOptions } from '../interfaces/IPaginationOptions';

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

  //type of query.anyProperty is string,
  // page and limit will be acceed from query string so convert string to number
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
