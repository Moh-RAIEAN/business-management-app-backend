import { commotConstants } from '../../../constants/common.constants';
import pick from '../../../helpers/pick';
import sendResponse from '../../../helpers/sendResponse';
import { IPaginationOptions } from '../../../interfaces/common.interface';
import catchAsync from '../../../shared/catchAsync';
import { EmployeeConstants } from '../employee/employee.constants';
import { IEmployeeFilters } from '../employee/employee.interface';
import { AdminService } from './admin.service';

const { PAGINATION_OPTIONS } = commotConstants;

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

const getAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAdmin();
  sendResponse(res, result);
});

export const AdminControllers = {
  createAdmin,
  createEmployee,
  getEployees,
  getEployee,
  getAdmin,
};
