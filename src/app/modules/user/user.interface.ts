import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { UserConstants } from './user.constants';
import { IEmployee } from '../employee/employee.interface';

const ROLES = UserConstants.ROLES;
export type IUser = {
  userId: string;
  role: (typeof ROLES)[number];
  password: string;
  admin?: Types.ObjectId | IAdmin;
  employee?: Types.ObjectId | IEmployee;
};

export type IUserStatics = {
  // eslint-disable-next-line no-unused-vars
  comparePassword: (givenpassword: string, savedPassword: string) => boolean;
};
export type IUserModel = IUserStatics & Model<IUser>;
