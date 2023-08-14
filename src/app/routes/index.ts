import { Router } from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ProductCategoryRoutes } from '../modules/productCategory/productCategory.routes';
import { EmployeeRoutes } from '../modules/employee/employee.routes';

const router: Router = Router();

const routes = [
  { path: '/admin', routes: AdminRoutes },
  { path: '/auth', routes: AuthRoutes },
  { path: '/categories', routes: ProductCategoryRoutes },
  { path: '/employees', routes: EmployeeRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

export const AppRoutes = router;
