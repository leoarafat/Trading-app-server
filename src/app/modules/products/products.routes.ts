import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { uploadFile } from '../../middlewares/fileUploader';
import { ProductController } from './products.controller';
const router = Router();

router.post(
  '/add-product',
  auth(ENUM_USER_ROLE.USER),
  uploadFile(),
  ProductController.insertIntoDB,
);

export const ProductRoutes = router;
