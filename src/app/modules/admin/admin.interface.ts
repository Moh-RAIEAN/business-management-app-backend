import { Model } from 'mongoose';

export type IAdmin = {
  adminId: string;
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
