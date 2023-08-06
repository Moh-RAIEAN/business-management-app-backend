import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';
import validateRequest from '../../middlewares/validateReques';

const router: Router = Router();

router.post(
  '/login',
  validateRequest(AuthValidations.loginTimeValidation),
  AuthControllers.login,
);

export const AuthRoutes = router;
