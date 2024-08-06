import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { SwapController } from './swap.controller';

const router = Router();

router.post('/make-swap', auth(ENUM_USER_ROLE.USER), SwapController.makeSwap);
router.get(
  '/pending-swap',
  auth(ENUM_USER_ROLE.USER),
  SwapController.pendingSwap,
);
router.patch(
  '/approve/:id',
  auth(ENUM_USER_ROLE.USER),
  SwapController.approveSwap,
);
router.patch(
  '/reject/:id',
  auth(ENUM_USER_ROLE.USER),
  SwapController.rejectSwap,
);
router.get(
  '/swap-details/:id',
  auth(ENUM_USER_ROLE.USER),
  SwapController.swapDetails,
);
export const SwapRoutes = router;
