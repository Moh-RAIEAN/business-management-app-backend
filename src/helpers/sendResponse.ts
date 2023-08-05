import { Response } from 'express';
import {
  IGenericResponse,
  IGenericResult,
} from '../interfaces/response.interface';

const sendResponse = <T>(res: Response, data: IGenericResult<T>): void => {
  const response: IGenericResponse<T> = {
    statusCode: data?.statusCode || 200,
    success: false,
    message: data?.message,
    data: data?.data,
  };
  res.status(response.statusCode).json(response);
};

export default sendResponse;
