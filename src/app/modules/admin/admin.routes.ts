import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateReques';
import { AdminValidations } from './admin.validation';
import { EmployeeValidations } from '../employee/employee.validation';
import { productCategoryValidations } from '../productCategory/productCategory.validation';
import checkNoAdmin from '../../middlewares/checkNoAdmin';
import validateAuth from '../../middlewares/validateAuth';
import { UserConstants } from '../user/user.constants';
import { ProductValidations } from '../product/product.validation';

const [ADMIN] = UserConstants.ROLES;
const router: Router = Router();
/* ############# ADMIN SPECIFIC ROUTES ############# */
router.post(
  '/create-admin',
  checkNoAdmin(),
  validateRequest(AdminValidations.creatingTimeAdminValidation),
  AdminControllers.createAdmin,
);

router.get('/', validateAuth([ADMIN]), AdminControllers.getAdmin);
router.patch(
  '/',
  validateAuth([ADMIN]),
  validateRequest(AdminValidations.updatingTimeAdminValidation),
  AdminControllers.updateAdmin,
);
router.delete('/', validateAuth([ADMIN]), AdminControllers.deleteAdmin);

/* ############# EMPLOYEE SPECIFIC ROUTES ############# */
router.post(
  '/create-employee',
  validateAuth([ADMIN]),
  validateRequest(EmployeeValidations.creatingTimeEmployeeValidation),
  AdminControllers.createEmployee,
);

router.get('/employees', validateAuth([ADMIN]), AdminControllers.getEployees);
router.get(
  '/employees/:id',
  validateAuth([ADMIN]),
  AdminControllers.getEployee,
);
router.patch(
  '/employees/:id',
  validateAuth([ADMIN]),
  AdminControllers.updateEployee,
);
router.delete(
  '/employees/:id',
  validateAuth([ADMIN]),
  AdminControllers.deleteEployee,
);

/* ############# CATEGORY SPECIFIC ROUTES ############# */
router.post(
  '/categories',
  validateAuth([ADMIN]),
  validateRequest(productCategoryValidations.creatingTimecategoryValidation),
  AdminControllers.createCategory,
);

router.patch(
  '/categories/:id',
  validateAuth([ADMIN]),
  validateRequest(productCategoryValidations.updatingTimeCategoryValidation),
  AdminControllers.updateProductCategory,
);
router.delete(
  '/categories/:id',
  validateAuth([ADMIN]),
  AdminControllers.deleteProductCategory,
);

/* ############# PRODUCT SPECIFIC ROUTES ############# */
router.post(
  '/products',
  validateAuth([ADMIN]),
  validateRequest(ProductValidations.creatingTimeProductValidation),
  AdminControllers.createProduct,
);
router.patch(
  '/products/:id',
  validateAuth([ADMIN]),
  validateRequest(ProductValidations.updatingTimeProductValidation),
  AdminControllers.updateProduct,
);
router.delete(
  '/products/:id',
  validateAuth([ADMIN]),
  // validateRequest(productCategoryValidations.categoryValidation),
  AdminControllers.deleteProduct,
);

export const AdminRoutes = router;
