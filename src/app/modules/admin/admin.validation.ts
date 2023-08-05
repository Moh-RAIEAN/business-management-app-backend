import { z } from 'zod';

const creatingTimeAdminValidation = z.object({
  body: z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    image: z.string().nonempty(),
    role: z.string().nonempty(),
    password: z.string().nonempty(),
  }),
});

export const AdminValidations = { creatingTimeAdminValidation };
