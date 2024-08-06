import { Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';
import { IProducts } from '../products/products.interface';

export type ISwap = {
  userFrom: Types.ObjectId | IUser;
  userTo: Types.ObjectId | IUser;
  productFrom: Types.ObjectId | IProducts;
  productTo: Types.ObjectId | IProducts;
  isApproved: 'pending' | 'approved' | 'rejected';
};
