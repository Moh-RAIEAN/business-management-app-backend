import { Schema, model } from 'mongoose';
import { IEmployee, IEmployeeModel } from './employee.interface';
import { EmployeeConstants } from './employee.constants';

const { GENDER, RELEGIONS } = EmployeeConstants;
const EmployeeSchema = new Schema<IEmployee, IEmployeeModel>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    gender: {
      type: String,
      required: true,
      enum: GENDER,
    },
    salary: {
      type: Number,
      required: true,
    },
    isSalaryprovided: {
      type: Boolean,
      required: true,
      default: false,
    },
    salaryProvidedAt: {
      type: Date,
    },
    relegion: {
      type: String,
      required: true,
      enum: RELEGIONS,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    highestEducationLevel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergancyContactNo: {
      type: String,
      required: true,
      unique: true,
    },
    needsToChangePassword: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

export const Employee = model<IEmployee, IEmployeeModel>(
  'Employee',
  EmployeeSchema,
);
