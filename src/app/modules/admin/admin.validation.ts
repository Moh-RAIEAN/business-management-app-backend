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
        .nonempty()
        .trim(),
    })
    .strict({ message: 'please provide only name image, password fileds!' }),
});

export const AdminValidations = { creatingTimeAdminValidation };
