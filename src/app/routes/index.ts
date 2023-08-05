import { Router } from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';

const router: Router = Router();

const routes = [{ path: '/admin', routes: AdminRoutes }];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

export const AppRoutes = router;
