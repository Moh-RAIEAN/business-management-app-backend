import { UserConstants } from '../user/user.constants';
import User from '../user/user.model';

const [ADMIN] = UserConstants.ROLES;

const findMaxEmployeeId = async (): Promise<number> => {
  const response = await User.findOne({ role: { $ne: ADMIN } }).sort({
    createdAt: -1,
  });
  const maxId = response?.userId;
  // Em-1-202301 = 1
  return Number(maxId?.split('-')[1]) || 0;
};

const generateEmployeeId = (maxId: number): string => {
  const date = new Date();
  const year = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  const newEmployeeId = `Em-${maxId + 1}-${year}${month}`;
  return newEmployeeId;
};

export const EmployeeUtils = { findMaxEmployeeId, generateEmployeeId };
