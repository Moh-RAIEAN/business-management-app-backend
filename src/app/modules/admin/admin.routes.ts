import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateReques';
import { AdminValidations } from './admin.validation';
import { EmployeeValidations } from '../employee/employee.validation';
import { productCategoryValidations } from '../productCategory/productCategory.validation';

const router: Router = Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidations.creatingTimeAdminValidation),
  AdminControllers.createAdmin,
);

router.get('/', AdminControllers.getAdmin);

router.post(
  '/create-employee',
  validateRequest(EmployeeValidations.creatingTimeEmployeeValidation),
  AdminControllers.createEmployee,
);

router.get('/employees', AdminControllers.getEployees);
router.get('/employees/:id', AdminControllers.getEployee);
router.patch('/employees/:id', AdminControllers.updateEployee);
router.delete('/employees/:id', AdminControllers.deleteEployee);

router.post(
  '/categories',
  validateRequest(productCategoryValidations.categoryValidation),
  AdminControllers.createCategory,
);

router.patch('/categories/:id', AdminControllers.updateProductCategory);
router.delete('/categories/:id', AdminControllers.deleteProductCategory);

export const AdminRoutes = router;
