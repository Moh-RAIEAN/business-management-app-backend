import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateReques';
import { AdminValidations } from './admin.validation';

const router: Router = Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidations.creatingTimeAdminValidation),
  AdminControllers.createAdmin,
);
router.get('/', AdminControllers.getAdmin);

export const AdminRoutes = router;
