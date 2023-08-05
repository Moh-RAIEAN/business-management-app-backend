import sendResponse from '../../../helpers/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req, res) => {
  const adminData = req.body;
  const result = await AdminService.createAdmin(adminData);
  sendResponse(res, result);
});

const getAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAdmin();
  sendResponse(res, result);
});

export const AdminControllers = { createAdmin, getAdmin };
