/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'mongoose';
import { EmployeeConstants } from './employee.constants';
import { IName } from '../../../interfaces/common.interface';
import { UserConstants } from '../user/user.constants';

const { GENDER, RELEGIONS, SEACHABLE_FILEDS } = EmployeeConstants;
const ROLES = UserConstants.ROLES;

export type IEmployee = {
  role?: (typeof ROLES)[number];
  name: IName;
  age: number;
  image: string;
  isActive: boolean;
  gender: (typeof GENDER)[number];
  salary: number;
  isSalaryprovided: boolean;
  salaryProvidedAt?: Date;
  relegion: (typeof RELEGIONS)[number];
  dateOfBirth: Date;
  presentAddress: string;
  permanentAddress: string;
  highestEducationLevel: string;
  email: string;
  contactNo: string;
  emergancyContactNo: string;
  needsToChangePassword: boolean;
};

export type IEmployeeModel = Model<IEmployee, Record<string, unknown>>;

export type IEmployeeSeachableFields = (typeof SEACHABLE_FILEDS)[number];

export type IEmployeeFilters = {
  [key: string]: string | number | undefined;
  searchTerm?: string;
  salary?: number;
  status?: string; // active status
  gender?: string;
  role?: string;
  contactNo?: string;
  emergancyContactNo?: string;
};
