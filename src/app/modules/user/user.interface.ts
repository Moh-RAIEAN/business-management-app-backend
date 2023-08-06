import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  userId: string;
  role: string;
  password: string;
  admin?: Types.ObjectId | IAdmin;
  seller?: Types.ObjectId | string;
  stuff?: Types.ObjectId | string;
};

export type IUserStatics = {
  // eslint-disable-next-line no-unused-vars
  comparePassword: (givenpassword: string, savedPassword: string) => boolean;
};
export type IUserModel = IUserStatics & Model<IUser>;
