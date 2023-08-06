import { Model } from 'mongoose';

export type IAdmin = {
  userId: string;
  firstName: string;
  lastName: string;
  image: string;
  role: string;
  password?: string;
};

type IAdminStatics = {
  isExist: () => Promise<boolean>;
};
export type IAdminModel = IAdminStatics & Model<IAdmin>;
