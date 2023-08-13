import { commonConstants } from '../../../constants/common.constants';
import pick from '../../../helpers/pick';
import sendResponse from '../../../helpers/sendResponse';
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions';
import catchAsync from '../../../shared/catchAsync';
import { EmployeeConstants } from '../employee/employee.constants';
import { IEmployeeFilters } from '../employee/employee.interface';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req, res) => {
  const adminData = req.body;
  const result = await AdminService.createAdmin(adminData);
  sendResponse(res, result);
});

const createEmployee = catchAsync(async (req, res) => {
  const employeeData = req.body;
  const result = await AdminService.createEmployee(employeeData);
  sendResponse(res, result);
});

const getEployees = catchAsync(async (req, res) => {
  const { PAGINATION_OPTIONS } = commonConstants;
  const { FILTERS } = EmployeeConstants;
  const employeeFilters = pick(req.query, FILTERS) as IEmployeeFilters;
  const paginationOptions = pick(
    req.query,
    PAGINATION_OPTIONS,
  ) as unknown as IPaginationOptions;
  const result = await AdminService.getEployees(
    employeeFilters,
    paginationOptions,
  );
  sendResponse(res, result);
});

const getEployee = catchAsync(async (req, res) => {
  const employeeId = req.params?.id;
  const result = await AdminService.getEployee(employeeId);
  sendResponse(res, result);
});

const updateEployee = catchAsync(async (req, res) => {
  const employeeId = req.params?.id;
  const updatedData = req.body;
  const result = await AdminService.updateEmployee(employeeId, updatedData);
  sendResponse(res, result);
});

const deleteEployee = catchAsync(async (req, res) => {
  const employeeId = req.params?.id;
  const result = await AdminService.deleteEmployee(employeeId);
  sendResponse(res, result);
});

const getAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAdmin();
  sendResponse(res, result);
});

const createCategory = catchAsync(async (req, res) => {
  const productCategoryData = req.body;
  const result = await AdminService.createCategory(productCategoryData);
  sendResponse(res, result);
});

const updateProductCategory = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const updatedData = req.body;
  const result = await AdminService.updateProductCategory(id, updatedData);
  sendResponse(res, result);
});

const deleteProductCategory = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const result = await AdminService.deleteProductCategory(id);
  sendResponse(res, result);
});

export const AdminControllers = {
  createAdmin,
  createEmployee,
  getEployees,
  getEployee,
  updateEployee,
  deleteEployee,
  getAdmin,
  createCategory,
  updateProductCategory,
  deleteProductCategory,
};
