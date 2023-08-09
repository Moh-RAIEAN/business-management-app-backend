import { Error } from 'mongoose';
import {
  IGenericError,
  IGenericErrorMessage,
} from '../../interfaces/error.interface';

const handleValidation = (error: Error.ValidationError): IGenericError => {
  const errors = error.errors;
  const errorMessages: IGenericErrorMessage[] = Object.values(errors).map(
    (error) => {
      let message: string = error.message;
      if (error.kind === 'required') {
        message = `${error.path} is ${error.kind}`;
      }
      return { path: error?.path, message: message };
    },
  );
  return { message: error.name, errorMessages };
};

export default handleValidation;
