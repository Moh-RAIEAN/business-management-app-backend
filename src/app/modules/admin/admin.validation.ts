/* eslint-disable camelcase */
import { z } from 'zod';

const creatingTimeAdminValidation = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: 'firstName is required!' })
      .nonempty(),
    lastName: z.string({ required_error: 'lastName is required!' }).nonempty(),
    image: z.string({ required_error: 'image is required!' }).nonempty(),
    role: z.string({ required_error: 'role is required!' }).nonempty(),
    password: z.string({ required_error: 'password is required!' }).nonempty(),
  }),
});

export const AdminValidations = { creatingTimeAdminValidation };
