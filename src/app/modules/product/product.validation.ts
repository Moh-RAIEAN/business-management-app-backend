/* eslint-disable camelcase */
import { z } from 'zod';

const creatingTimeProductValidation = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'name is required!' }),
      price: z
        .number({ required_error: 'price is required!' })
        .min(1, { message: 'quantity mustbe greater or equal to 1' }),
      category: z.string({ required_error: 'category is required!' }),
      quantity: z.number({ required_error: 'quantity is required!' }),
    })
    .strict({
      message: 'please provide only name, price,category, qunatity fields',
    }),
});

const updatingTimeProductValidation = z.object({
  body: z
    .object({
      name: z.string().optional(),
      price: z.number().optional(),
      category: z.string().optional(),
      quantity: z.number().optional(),
      isInStock: z.boolean().optional(),
      isExpired: z.boolean().optional(),
    })

    .strict({
      message:
        'please provide only name, price,category, qunatity, in stock, is expired fields',
    }),
});
export const ProductValidations = {
  creatingTimeProductValidation,
  updatingTimeProductValidation,
};
