import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  admin?: string;
  seller?: string;
  stuff?: string;
};

export type IUserModel = Model<IUser>;
