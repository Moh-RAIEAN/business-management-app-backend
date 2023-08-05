import { Error } from 'mongoose';
import {
  IGenericError,
  IGenericErrorMessages,
} from '../../interfaces/error.interface';

const handleMongoose = (error: Error.ValidationError): IGenericError => {
  const errors = error.errors;
  const errorMessages: IGenericErrorMessages[] = Object.values(errors).map(
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

export default handleMongoose;
