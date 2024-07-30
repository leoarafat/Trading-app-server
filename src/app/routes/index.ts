import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { SubCategoryRoutes } from '../modules/sub-category/sub-category.routes';
import { SubscriptionsRoutes } from '../modules/subscriptions/subscriptions.routes';
import { AddsRoutes } from '../modules/media/media.routes';
import { ManageRoutes } from '../modules/settings/settings.routes';
import { DashboardRoutes } from '../modules/dashboard/dashboard.routes';
import { UpgradePlanRoutes } from '../modules/upgrade-plan/upgrade-plan.routes';

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
  {
    path: '/rules',
    route: ManageRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/plan',
    route: UpgradePlanRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
