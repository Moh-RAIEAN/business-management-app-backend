type IMeta = {
  page?: number;
  limit?: number;
  total?: number;
  skip?: number;
};

export type IGenericResult<T> = {
  statusCode?: number;
  message: string;
  meta?: IMeta;
  data: T;
};

export type IGenericResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: IMeta;
  data: T;
};
