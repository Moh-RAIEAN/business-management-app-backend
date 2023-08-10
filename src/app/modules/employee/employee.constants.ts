const RELEGIONS = ['muslim', 'hidu', 'christian', 'other'];
const GENDER = ['male', 'female'];
const SEACHABLE_FILEDS = [
  'name.firstName',
  'name.lastName',
  'gender',
  'relegion',
  'presentAddress',
  'permanentAddress',
  'highestEducationLevel',
  'email',
];
const FILTERS = [
  'searchTerm',
  'salary',
  'isActive',
  'role',
  'gender',
  'email',
  'contactNo',
  'emergancyContactNo',
];
//                 -> /employees/?sellers
//                 -> /employees/?stuffs
//                 -> /employees/?active
//                 -> /employees/?deactive
//                 -> /employees/?contactNo
//                 -> /employees/?emergancyContactNo
// role?: (typeof ROLES)[number];
//   name: IName;
//   age: number;
//   image: string;
//   isActive: boolean;
//   gender: (typeof GENDER)[number];
//   salary: number;
//   isSalaryprovided: boolean;
//   salaryProvidedAt?: Date;
//   relegion: (typeof RELEGIONS)[number];
//   dateOfBirth: Date;
//   presentAddress: string;
//   permanentAddress: string;
//   highestEducationLevel: string;
//   email: string;
//   contactNo: string;
//   emergancyContactNo: string;
//   needsToChangePassword: boolean;
export const EmployeeConstants = {
  RELEGIONS,
  GENDER,
  SEACHABLE_FILEDS,
  FILTERS,
};
