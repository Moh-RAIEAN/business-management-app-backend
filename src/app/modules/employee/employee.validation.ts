/* eslint-disable camelcase */
import { z } from 'zod';
import { EmployeeConstants } from './employee.constants';
import { UserConstants } from '../user/user.constants';

const [, ...ROLES] = UserConstants.ROLES;
const creatingTimeEmployeeValidation = z.object({
  body: z
    .object({
      role: z.enum(ROLES as [string, ...string[]], {
        required_error: 'role is required!',
      }),
      name: z.object({
        firstName: z
          .string({ required_error: 'first name is required!' })
          .nonempty()
          .trim(),
        lastName: z
          .string({ required_error: 'last name is required!' })
          .nonempty()
          .trim(),
      }),
      age: z.number().min(18),
      image: z
        .string({ required_error: 'image is required!' })
        .nonempty()
        .trim(),
      gender: z.enum(EmployeeConstants.GENDER as [string, ...string[]]),
      salary: z.number({ required_error: 'salary is required!' }).min(0),
      relegion: z.enum(EmployeeConstants.RELEGIONS as [string, ...string[]]),
      dateOfBirth: z
        .string({ required_error: 'date of birth is required!' })
        .datetime(),
      presentAddress: z
        .string({ required_error: 'present address is required!' })
        .nonempty()
        .trim(),
      permanentAddress: z
        .string({ required_error: 'permanent address is required!' })
        .nonempty()
        .trim(),
      highestEducationLevel: z
        .string({ required_error: 'highest education level is required!' })
        .nonempty()
        .trim(),
      email: z.string({ required_error: 'email is required!' }).email(),
      contactNo: z
        .string({ required_error: 'contact no is required!' })
        .nonempty()
        .min(11)
        .max(11),
      emergancyContactNo: z
        .string({ required_error: 'emergancy contact no is required!' })
        .nonempty()
        .min(11)
        .max(11),
    })
    .strict(),
});

export const EmployeeValidations = { creatingTimeEmployeeValidation };
