import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../shared/catchAsync';
import ApiError from '../errors/ApiError';
import User from '../modules/user/user.model';
import { RequestHandler } from 'express';
import { UserConstants } from '../modules/user/user.constants';

const checkNoAdmin = (): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    const [ADMIN] = UserConstants.ROLES;
    const isExist = await User.findOne({ role: ADMIN });
    if (isExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Admin is already exists!');
    }

    next();
  });
};

export default checkNoAdmin;
