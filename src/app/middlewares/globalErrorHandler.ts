/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { IGlobalError } from '../../interfaces/error.interface';
import ApiError from '../errors/ApiError';
import handleApiError from '../errors/handleApiError';
import sendErrorResponse from '../../helpers/sendErrorResponse';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import mongoose from 'mongoose';
import handleMongoose from '../errors/handleMongoose';

const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next,
) => {
  const errorResponse: IGlobalError = {
    statusCode: 400,
    success: false,
    message: error.message,
    errorMessages: [],
    stack: error.stack || '',
  };

  if (error instanceof ApiError) {
    const apiError = handleApiError(error);
    errorResponse.statusCode = apiError.statusCode!;
    errorResponse.message = apiError.message;
    errorResponse.errorMessages = apiError.errorMessages;
  }
  if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    errorResponse.message = zodError.message;
    errorResponse.errorMessages = zodError.errorMessages;
  }
  if (error instanceof mongoose.Error.ValidationError) {
    const apiError = handleMongoose(error);
    errorResponse.message = apiError.message;
    errorResponse.errorMessages = apiError.errorMessages;
  }
  sendErrorResponse(res, errorResponse);
};

export default globalErrorHandler;
