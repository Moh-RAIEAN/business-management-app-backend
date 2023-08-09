import { Model } from 'mongoose';
import { IName } from '../../../interfaces/common.interface';

export type IAdmin = {
  name: IName;
  image: string;
  email: string;
  password: string;
};

type IAdminStatics = {
  isExist: () => Promise<boolean>;
};
export type IAdminModel = IAdminStatics & Model<IAdmin>;
