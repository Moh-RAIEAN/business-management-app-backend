export type IAuthCredentials = {
  userId: string;
  password: string;
};

export type IAuthResponse = {
  accessToken: string;
  refreshToken?: string;
  userId: string;
  role: string;
};
