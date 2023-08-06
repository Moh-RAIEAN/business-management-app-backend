import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../helpers/sendResponse';
import Configs from '../../configs';
import { IAuthResponse } from './auth.interface';

const login = catchAsync(async (req, res) => {
  const userCredentials = req.body;
  const { data, message } = await AuthService.login(userCredentials);
  const { accessToken, refreshToken, ...othersData } = data;
  const cookiesOptions = {
    isSeceure: Configs.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookiesOptions);
  sendResponse<IAuthResponse>(res, {
    message,
    data: { ...othersData, accessToken },
  });
});

export const AuthControllers = { login };
