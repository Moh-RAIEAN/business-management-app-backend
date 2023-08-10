import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateReques';
import { AdminValidations } from './admin.validation';
import { EmployeeValidations } from '../employee/employee.validation';

const router: Router = Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidations.creatingTimeAdminValidation),
  AdminControllers.createAdmin,
);

router.post(
  '/create-employee',
  validateRequest(EmployeeValidations.creatingTimeEmployeeValidation),
  AdminControllers.createEmployee,
);
router.get('/employees', AdminControllers.getEployees);
router.get('/employees/:id', AdminControllers.getEployee);
router.get('/', AdminControllers.getAdmin);

export const AdminRoutes = router;
