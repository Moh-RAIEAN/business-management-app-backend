import { ZodError } from 'zod';
import {
  IGenericError,
  IGenericErrorMessages,
} from '../../interfaces/error.interface';

const handleZodError = (error: ZodError): IGenericError => {
  const errorMessages: IGenericErrorMessages[] = error.issues.map((issue) => ({
    path: issue?.path[issue.path.length - 1].toString(),
    message: issue?.message,
  }));
  return { message: error.name, errorMessages };
};

export default handleZodError;
