/* eslint-disable @typescript-eslint/no-unused-vars */
import { EmployeeService } from './employee.service';
// import { IEmployee } from './employee.interface';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../helpers/sendResponse';

const getUserProfile = catchAsync(async (req, res) => {
  const id = req.user?.userId;
  const result = await EmployeeService.getProfile(id!);
  sendResponse(res, result);
});

const updateProfile = catchAsync(async (req, res) => {
  const employeeId = req.user?.userId;
  const updatedData = req.body;
  const result = await EmployeeService.updateProfile(employeeId!, updatedData);
  sendResponse(res, result);
});
export const EmployeeController = { getUserProfile, updateProfile };
