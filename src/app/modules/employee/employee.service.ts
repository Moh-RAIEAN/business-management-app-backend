/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { IGenericResult } from '../../../interfaces/response.interface';
import ApiError from '../../errors/ApiError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { Employee } from './employee.model';
import { IEmployee } from './employee.interface';

const getProfile = async (id: string): Promise<IGenericResult<IUser>> => {
  const result = await User.findOne({ userId: id }).populate('employee');
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No user found!');
  }
  return { message: 'User profile retirved successfully!', data: result };
};

const updateProfile = async (
  id: string,
  updatedData: Partial<IEmployee>,
): Promise<IGenericResult<IUser | null>> => {
  const isExist = await User.findOne({ userId: id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found!');
  }

  const { name, ...othersData } = updatedData;
  const updatedName: { [key: string]: string } = {};
  if (name) {
    Object.keys(name).forEach((n) => {
      updatedName[`name.${n}`] = (name as { [key: string]: string })[n];
    });
  }

  const modifiedUpdatedData = { ...othersData, ...updatedName };
  const updatedProfile = await Employee.findByIdAndUpdate(
    isExist?.employee,
    modifiedUpdatedData,
  );
  if (!updatedProfile) {
    throw new ApiError(500, 'Can not update profile internal server error!');
  }
  const result = await User.findOne({ employee: updatedProfile._id }).populate(
    'employee',
  );
  return { message: 'Employee updated successfully!', data: result };
};
export const EmployeeService = { getProfile, updateProfile };
