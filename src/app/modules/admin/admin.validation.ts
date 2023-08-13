/* eslint-disable camelcase */
import { z } from 'zod';

const creatingTimeAdminValidation = z.object({
  body: z
    .object({
      name: z.object({
        firstName: z
          .string({ required_error: 'firstName is required!' })
          .nonempty()
          .trim(),
        lastName: z
          .string({ required_error: 'lastName is required!' })
          .nonempty()
          .trim(),
      }),
      image: z
        .string({ required_error: 'image is required!' })
        .nonempty()
        .trim(),
      email: z
        .string({ required_error: 'image is required!' })
        .nonempty()
        .email(),
      password: z
        .string({ required_error: 'password is required!' })
        .nonempty(),
    })
    .strict({ message: 'please provide only name image, password fileds!' }),
});

const updatingTimeAdminValidation = z.object({
  body: z
    .object({
      name: z
        .object({
          firstName: z.string().nonempty().trim().optional(),
          lastName: z.string().nonempty().trim().optional(),
        })
        .optional(),
      image: z.string().nonempty().trim().optional(),
      email: z.string().nonempty().email().optional(),
      password: z.string().nonempty().optional(),
    })
    .strict({ message: 'please provide only name image, password fileds!' }),
});

export const AdminValidations = {
  creatingTimeAdminValidation,
  updatingTimeAdminValidation,
};
