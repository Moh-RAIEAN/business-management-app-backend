import mongoose from 'mongoose';
import { IGenericResult } from '../../../interfaces/response.interface';
import Configs from '../../configs';
import ApiError from '../../errors/ApiError';
import { IAdmin } from './admin.interface';
import Admin from './admin.model';
import User from '../user/user.model';
import { IUser } from '../user/user.interface';

const createAdmin = async (
  adminData: IAdmin,
): Promise<IGenericResult<IUser>> => {
  const isExist = await Admin.isExist();
  if (isExist) {
    throw new ApiError(403, 'admin is already exist!');
  }

  adminData.userId = Configs.adminId!;
  const session = await mongoose.startSession();
  let result = null;
  try {
    session.startTransaction();
    const createdAdmin = await Admin.create([adminData], { session });
    if (createdAdmin.length < 0) {
      throw new ApiError(400, 'can"t create admin internal server error');
    }
    const { userId, _id, role } = createdAdmin[0];
    const userData: IUser = {
      userId,
      role,
      admin: _id,
      password: adminData.password!,
    };

    const createdUser = await User.create([userData], { session });
    if (createdUser.length < 0) {
      throw new ApiError(400, 'can"t create user internal server error');
    }

    result = await createdUser[0].populate('admin');
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return { message: 'admin created successfully!', data: result };
};

const getAdmin = async (): Promise<IGenericResult<IAdmin | null>> => {
  const result = await Admin.findOne({});
  return { message: 'Admin retirved successfully!', data: result };
};
export const AdminService = { createAdmin, getAdmin };
