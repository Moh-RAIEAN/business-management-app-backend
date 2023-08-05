import { IGenericError } from '../../interfaces/error.interface';
import ApiError from './ApiError';

const handleApiError = (error: ApiError): IGenericError => {
  const apiError: IGenericError = {
    statusCode: error.statusCode,
    message: error.message,
    errorMessages: error?.errorMessages,
  };

  return apiError;
};

export default handleApiError;
