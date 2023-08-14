/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { EmployeeController } from './employee.controller';
import { UserConstants } from '../user/user.constants';
import validateAuth from '../../middlewares/validateAuth';

const [, SELLER, STUFF] = UserConstants.ROLES;
const router: Router = Router();

router.get(
  '/profile',
  validateAuth([SELLER, STUFF]),
  EmployeeController.getUserProfile,
);
router.patch(
  '/profile',
  validateAuth([SELLER, STUFF]),
  EmployeeController.updateProfile,
);

export const EmployeeRoutes = router;
