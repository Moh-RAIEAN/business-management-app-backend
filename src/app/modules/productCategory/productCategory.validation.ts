/* eslint-disable camelcase */
import { z } from 'zod';

const creatingTimecategoryValidation = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'category name is required!' })
        .nonempty(),
    })
    .strict({
      message: 'please provide only name field',
    }),
});

const updatingTimeCategoryValidation = creatingTimecategoryValidation;
export const productCategoryValidations = {
  creatingTimecategoryValidation,
  updatingTimeCategoryValidation,
};
