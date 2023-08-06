import { StatusCodes } from 'http-status-codes';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import { IGenericResult } from '../../../interfaces/response.interface';
import ApiError from '../../errors/ApiError';
import User from '../user/user.model';
import { IAuthCredentials, IAuthResponse } from './auth.interface';
import Configs from '../../configs';
import { Secret } from 'jsonwebtoken';

const login = async (
  userCredentials: IAuthCredentials,
): Promise<IGenericResult<IAuthResponse>> => {
  if (!userCredentials) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'No user credentials provided for authentication!',
    );
  }

  const { userId, password: givenpassword } = userCredentials;
  if (!userId || !givenpassword) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `${userId ? 'user id' : 'password'} is requried!`,
      [
        {
          path: `${userId ? 'user id' : 'password'}`,
          message: `${userId ? 'user id' : 'password'} is requried!`,
        },
      ],
    );
  }

  const isExist = await User.findOne({ userId });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No user found!', [
      { path: 'userId', message: 'No user found!' },
    ]);
  }

  const isPasswordMatched = User.comparePassword(
    givenpassword,
    isExist.password,
  );
  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Password did not matched!');
  }

  const accessToken = JwtHelpers.createToken(
    { userId, role: isExist.role },
    Configs.jwtTokenSecret as Secret,
    { expiresIn: Configs.jwtTokenExpirationDate },
  );
  const refreshToken = JwtHelpers.createToken(
    { userId, role: isExist.role },
    Configs.jwtRefreshTokenSecret as Secret,
    { expiresIn: Configs.jwtRefreshTokenExpirationDate },
  );
  return {
    message: 'user logged in successfully!',
    data: {
      accessToken,
      refreshToken,
      userId,
      role: isExist.role,
    },
  };
};

export const AuthService = { login };
