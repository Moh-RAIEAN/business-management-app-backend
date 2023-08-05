import { Response } from 'express';
import { IGlobalError } from '../interfaces/error.interface';

const sendErrorResponse = (res: Response, data: IGlobalError): void => {
  const error: IGlobalError = {
    statusCode: data?.statusCode,
    success: false,
    message: data?.message,
    errorMessages: data?.errorMessages,
    stack: data?.stack,
  };
  res.status(error.statusCode).json(error);
};

export default sendErrorResponse;
