import {
  IGenericError,
  IGenericErrorMessage,
} from '../../interfaces/error.interface';

const handleDuplicateKeyError = (
  error: Record<string, string>,
): IGenericError => {
  const path = Object.keys(error.keyValue);

  const errorMessages: IGenericErrorMessage[] = [
    { path: path[0], message: `${path[0]} is already taken` },
  ];
  return { message: 'duplikate key', errorMessages };
};

export default handleDuplicateKeyError;
