/* eslint-disable camelcase */
import { z } from 'zod';

const loginTimeValidation = z.object({
  body: z.object({
    userId: z.string({ required_error: 'user id is required!' }).nonempty(),
    password: z.string({ required_error: 'password is required!' }).nonempty(),
  }),
});

export const AuthValidations = { loginTimeValidation };
