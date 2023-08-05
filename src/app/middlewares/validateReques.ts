import { RequestHandler } from 'express';
import catchAsync from '../../shared/catchAsync';
import { ZodEffects, AnyZodObject } from 'zod';

const validateRequest = (
  schema: AnyZodObject | ZodEffects<AnyZodObject>,
): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      cookies: req.cookies,
      params: req.params,
    });
    next();
  });
};

export default validateRequest;
