import { ZodError } from 'zod';
import {
  IGenericError,
  IGenericErrorMessage,
} from '../../interfaces/error.interface';

const handleZodError = (error: ZodError): IGenericError => {
  const errorMessages: IGenericErrorMessage[] = error.issues.map((issue) => ({
    path: issue?.path[issue.path.length - 1].toString(),
    message: issue?.message,
  }));
  return { message: 'validation', errorMessages };
};

export default handleZodError;
