export type IGenericErrorMessages = {
  path: string;
  message: string;
};

export type IGenericError = {
  statusCode?: number;
  message: string;
  errorMessages: IGenericErrorMessages[];
};

export type IGlobalError = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessages[];
  stack: string;
};
