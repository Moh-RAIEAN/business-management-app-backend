export type IGenericErrorMessage = {
  path: string;
  message: string;
};

export type IGenericError = {
  statusCode?: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGlobalError = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessage[];
  stack: string;
};
