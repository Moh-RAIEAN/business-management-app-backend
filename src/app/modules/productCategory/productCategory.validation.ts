/* eslint-disable camelcase */
import { z } from 'zod';

const categoryValidation = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'category name is required!' })
        .nonempty(),
    })
    .strict(),
});

export const productCategoryValidations = { categoryValidation };
