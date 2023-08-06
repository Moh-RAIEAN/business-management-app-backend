import { Router } from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router: Router = Router();

const routes = [
  { path: '/admin', routes: AdminRoutes },
  { path: '/auth', routes: AuthRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

export const AppRoutes = router;
