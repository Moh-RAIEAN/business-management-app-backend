import mongoose from 'mongoose';
import { IGenericResult } from '../../../interfaces/response.interface';
import Configs from '../../configs';
import ApiError from '../../errors/ApiError';
import { IAdmin } from './admin.interface';
import Admin from './admin.model';
import User from '../user/user.model';
import { IUser } from '../user/user.interface';
import { IEmployee, IEmployeeFilters } from '../employee/employee.interface';
import { StatusCodes } from 'http-status-codes';
import { UserConstants } from '../user/user.constants';
import { Employee } from '../employee/employee.model';
import { EmployeeUtils } from '../employee/employee.utils';
import { IPaginationOptions } from '../../../interfaces/common.interface';
import { EmployeeConstants } from '../employee/employee.constants';
import { AdminUtils } from './admin.utils';
import handlePagination from '../../../helpers/paginationHelpers';

const [ADMIN] = UserConstants.ROLES;
const { adminId, defaultEmployeePassword } = Configs;

const createAdmin = async (
  adminData: IAdmin,
): Promise<IGenericResult<IUser>> => {
  const isExist = await Admin.isExist();
  if (isExist) {
    throw new ApiError(403, 'admin is already exist!');
  }

  const session = await mongoose.startSession();
  let result = null;
  try {
    session.startTransaction();
    const createdAdmin = await Admin.create([adminData], { session });
    if (createdAdmin.length < 0) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'can"t create admin internal server error',
      );
    }
    const { _id } = createdAdmin[0];
    const userData: IUser = {
      userId: adminId!,
      role: ADMIN,
      admin: _id,
      password: adminData.password!,
    };

    const createdUser = await User.create([userData], { session });
    if (createdUser.length < 0) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'can"t create user internal server error',
      );
    }

    result = (await createdUser[0].populate('admin')).toJSON();
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return { message: 'admin created successfully!', data: result };
};

const createEmployee = async (
  employeeData: IEmployee,
): Promise<IGenericResult<IUser>> => {
  const session = await mongoose.startSession();
  let result = null;
  const userId = EmployeeUtils.generateEmployeeId(
    await EmployeeUtils.findMaxEmployeeId(),
  );

  try {
    session.startTransaction();
    const createdEmployee = await Employee.create([employeeData], { session });
    if (createdEmployee.length < 0) {
      throw new ApiError(400, 'can"t create employee internal server error');
    }
    const { _id } = createdEmployee[0];
    const userData: IUser = {
      userId,
      role: employeeData.role!,
      employee: _id,
      password: defaultEmployeePassword!,
    };

    const createdUser = await User.create([userData], { session });
    if (createdUser.length < 0) {
      throw new ApiError(400, 'can"t create user internal server error');
    }

    result = await createdUser[0].populate('employee');
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return { message: 'employee created successfully!', data: result };
};

const getEployees = async (
  employeeFilters: IEmployeeFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResult<IEmployee[]>> => {
  // handle database query
  const { searchTerm, ...otherFilters } = employeeFilters;
  const { SEACHABLE_FILEDS } = EmployeeConstants;
  const searchCondition: { [key: string]: unknown } = {};
  if (searchTerm) {
    searchCondition.$or = SEACHABLE_FILEDS.map((field) => {
      return { [`employee.${field}`]: { $regex: searchTerm, $options: 'i' } };
    });
  }

  const filtersCondition = AdminUtils.handleEmployeeFilters(otherFilters);

  const serachQuery = {
    $and: [
      searchCondition,
      filtersCondition.$and.length ? filtersCondition : {},
    ],
  };
  const aggregationQuery = [
    { $match: { role: { $ne: ADMIN } } },
    {
      $lookup: {
        from: 'employees',
        localField: 'employee',
        foreignField: '_id',
        as: 'employee',
      },
    },
    { $unwind: '$employee' },
    {
      $match: serachQuery,
    },
    { $project: { password: 0 } },
  ];
  // handle pagination
  const { page, skip, limit, sortBy, sortOrder } =
    handlePagination(paginationOptions);

  const users = await User.aggregate(aggregationQuery)
    .sort({ [sortBy]: sortOrder })
    .skip(skip!)
    .limit(limit!);
  const total = await User.aggregate([
    ...aggregationQuery,
    { $count: 'total' },
  ]);

  return {
    message: 'Employees retirved successfully!',
    meta: { page, limit, total: total[0]?.total },
    data: users,
  };
};
const getEployee = async (
  id: string,
): Promise<IGenericResult<IUser | null>> => {
  const result = await User.findOne({ employee: id }).populate('employee');
  return { message: 'Admin retirved successfully!', data: result };
};

const getAdmin = async (): Promise<IGenericResult<IAdmin | null>> => {
  const result = await Admin.findOne({});
  return { message: 'Admin retirved successfully!', data: result };
};
export const AdminService = {
  createAdmin,
  createEmployee,
  getEployees,
  getEployee,
  getAdmin,
};
