import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../shared/catchAsync';
import ApiError from '../errors/ApiError';
import { JwtHelpers } from '../../helpers/jwtHelpers';
import Configs from '../configs';
import User from '../modules/user/user.model';
import { RequestHandler } from 'express';

const validateAuth = (role: string[]): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    const authorization = req?.headers?.authorization;
    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'no token not authorized user!',
      );
    }

    const decoded = JwtHelpers.validateToken(token, Configs.jwtTokenSecret!);
    const { userId } = decoded;
    const isExist = await User.findOne({ userId });
    if (!isExist) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'user not found unauthorized access!',
      );
    }
    const isValidRole = role.includes(isExist?.role);
    if (!isValidRole) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'message permissoin denied!');
    }
    req.user = decoded;
    next();
  });
};

export default validateAuth;
