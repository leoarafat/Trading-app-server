import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { SubCategoryRoutes } from '../modules/sub-category/sub-category.routes';
import { SubscriptionsRoutes } from '../modules/subscriptions/subscriptions.routes';
import { AddsRoutes } from '../modules/media/media.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/sub-category',
    route: SubCategoryRoutes,
  },
  {
    path: '/subscription',
    route: SubscriptionsRoutes,
  },
  {
    path: '/adds',
    route: AddsRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
