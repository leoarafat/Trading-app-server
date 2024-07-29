import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { uploadFile } from '../../middlewares/fileUploader';
import { AdminController } from '../admin/admin.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminValidation } from '../admin/admin.validation';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();
//!User
router.post(
  '/register',
  validateRequest(AuthValidation.create),
  AuthController.registrationUser,
);
router.post('/activate-user', AuthController.activateUser);
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.login,
);
router.delete(
  '/delete-account',
  auth(ENUM_USER_ROLE.USER),
  AuthController.deleteMyAccount,
);
router.patch(
  '/change-password',
  auth(ENUM_USER_ROLE.USER),
  AuthController.changePassword,
);
router.post('/forgot-password', AuthController.forgotPass);
router.post('/reset-password', AuthController.resetPassword);
router.post('/resend', AuthController.resendActivationCode);
router.post('/verify-otp', AuthController.checkIsValidForgetActivationCode);

router.patch(
  '/edit-profile',
  auth(ENUM_USER_ROLE.USER),
  uploadFile(),
  AuthController.updateProfile,
);

//! Admin Authentication Start
router.post(
  '/admin/register',
  validateRequest(AdminValidation.create),
  AdminController.registerAdmin,
);

router.post(
  '/add-admin',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.create),
  AdminController.registerAdmin,
);
//! Admin Authentication End

router.get(
  '/users',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AuthController.getAllUsers,
);

router.patch(
  '/user-block/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AuthController.blockUser,
);

router.get(
  '/admins',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAllAdmin,
);

export const AuthRoutes = router;
