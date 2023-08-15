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
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions';
import { EmployeeConstants } from '../employee/employee.constants';
import { AdminUtils } from './admin.utils';
import handlePagination from '../../../helpers/paginationHelpers';
import { IProductCategory } from '../productCategory/productCategory.interface';
import { productCategoryUtils } from '../productCategory/productCategory.utils';
import { ProductCategory } from '../productCategory/productCategory.model';
import { IProduct } from '../product/product.interface';
import { ProductUtils } from '../product/product.uitils';
import { Product } from '../product/product.model';

const [ADMIN] = UserConstants.ROLES;
const { adminId, defaultEmployeePassword } = Configs;

/* ############# ADMIN SPECIFIC SERVICES ############# */

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

const getAdmin = async (): Promise<IGenericResult<IAdmin>> => {
  const result = await Admin.findOne({});
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No admin found');
  }
  return { message: 'Admin retirved successfully!', data: result };
};

const updateAdmin = async (
  updatedData: Partial<IAdmin>,
): Promise<IGenericResult<IAdmin | null>> => {
  const isExist = await Admin.findOne({});
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No admin found!');
  }
  const { name, ...othersUpdatedData } = updatedData;
  const updatedName: { [key: string]: string } = {};
  if (name) {
    Object.keys(name).forEach(
      (n: string) =>
        (updatedName[`name.${n}`] = (name as { [key: string]: string })[n]),
    );
  }
  const newUpdatedData = { ...othersUpdatedData, ...updatedName };
  const result = await Admin.findOneAndUpdate(
    { _id: isExist?._id },
    { $set: { ...newUpdatedData } },
    { new: true },
  );

  return { message: 'Admin updated successfully!', data: result };
};

const deleteAdmin = async (): Promise<IGenericResult<IAdmin | null>> => {
  const [ADMIN] = UserConstants.ROLES;
  const isExist = await Admin.findOne({});
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No amdin found!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.deleteOne({ role: ADMIN }, { session });
    await Admin.deleteOne({ _id: isExist?._id }, { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
  return { message: 'Admin deleted successfully!', data: isExist };
};

/* ############# EMPLOYEE SPECIFIC SERVICES ############# */

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

  const searchQuery = {
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
      $match: searchQuery,
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

const updateEmployee = async (
  id: string,
  updatedData: Partial<IEmployee>,
): Promise<IGenericResult<IUser | null>> => {
  const isExist = await User.findOne({ employee: id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found!');
  }

  const length = Object.keys(updatedData).length;
  const { role, name, ...othersData } = updatedData;
  const updatedName: { [key: string]: string } = {};
  if (name) {
    Object.keys(name).forEach((n) => {
      updatedName[`name.${n}`] = (name as { [key: string]: string })[n];
    });
  }
  const modifiedUpdatedData = { ...othersData, ...updatedName };

  if (role && length === 1) {
    isExist.role = role;
    await isExist?.save();
  } else if (role && length > 1) {
    isExist.role = role;
    await isExist.save();
    await Employee.updateOne({ _id: id }, { $set: { ...modifiedUpdatedData } });
  } else {
    await Employee.findByIdAndUpdate(id, modifiedUpdatedData);
  }

  const result = await User.findOne({ employee: id }).populate('employee');
  return { message: 'Employee updated successfully!', data: result };
};

const deleteEmployee = async (
  id: string,
): Promise<IGenericResult<IUser | null>> => {
  const isExist = await User.findOne({ employee: id }).populate('employee');
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.deleteOne({ employee: id }, { session });
    await Employee.deleteOne({ _id: id }, { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
  return { message: 'Employee deleted successfully!', data: isExist };
};

/* ############# CATEGORY SPECIFIC SERVICES ############# */

const createCategory = async (
  productCategoryData: IProductCategory,
): Promise<IGenericResult<IProductCategory>> => {
  const { findMaxCategoryId, generateCategoryId } = productCategoryUtils;
  productCategoryData.id = generateCategoryId(await findMaxCategoryId());
  const result = await ProductCategory.create(productCategoryData);
  return {
    message: 'category created successfully!',
    data: result,
  };
};

const updateProductCategory = async (
  id: string,
  updatedData: Pick<IProductCategory, 'name'>,
): Promise<IGenericResult<IProductCategory | null>> => {
  const isExist = await ProductCategory.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Produtc not found!');
  }
  const result = await ProductCategory.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return {
    message: 'category updated successfully!',
    data: result,
  };
};

const deleteProductCategory = async (
  id: string,
): Promise<IGenericResult<IProductCategory | null>> => {
  const isExist = await Product.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Product not found!');
  }
  const result = await ProductCategory.findByIdAndDelete(id);
  return {
    message: 'category deleted successfully!',
    data: result,
  };
};

/* ############# PRODUCT SPECIFIC SERVICES ############# */

const createProduct = async (
  productData: IProduct,
): Promise<IGenericResult<IProduct>> => {
  const isCategoryExists = await ProductCategory.findOne({
    id: productData.category,
  });
  if (!isCategoryExists) {
    throw new ApiError(
      404,
      `Category is not found for ${productData.category}!`,
    );
  }

  const { findMaxProductId, generateProductId } = ProductUtils;
  productData.id = generateProductId(
    await findMaxProductId(),
    String(productData.category),
  );

  productData.category = isCategoryExists?._id;
  const result = await Product.create(productData);
  return {
    message: 'Product created successfully!',
    data: result,
  };
};

const updateProduct = async (
  id: string,
  updatedData: IProduct,
): Promise<IGenericResult<IProduct | null>> => {
  const isExist = await Product.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Product not found!');
  }
  const result = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return { message: 'Product updated successfully!', data: result };
};

const deleteProduct = async (
  id: string,
): Promise<IGenericResult<IProduct | null>> => {
  const isExist = await Product.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Product not found!');
  }
  const result = await Product.findByIdAndDelete(id);
  return {
    message: 'Product deleted successfully!',
    data: result,
  };
};

export const AdminService = {
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  createEmployee,
  getEployees,
  getEployee,
  updateEmployee,
  deleteEmployee,
  createCategory,
  updateProductCategory,
  deleteProductCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
