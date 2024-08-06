import { Request } from 'express';
import { ISwap } from './swap.interface';
import ApiError from '../../../errors/ApiError';
import { Swap } from './swap.model';
import User from '../auth/auth.model';
import { IReqUser } from '../auth/auth.interface';
import { Point } from '../points/points.model';

const makeSwap = async (req: Request) => {
  const user = req.user as IReqUser;
  const payload = req.body as ISwap;
  const isExistUSer = await User.findById(user.userId);
  if (!isExistUSer) {
    throw new ApiError(404, 'Requested User not found');
  }
  if (!payload.productFrom || payload.productTo || payload.userTo) {
    throw new ApiError(400, 'Product or User is missing');
  }

  return await Swap.create({
    userFrom: isExistUSer._id,
    userTo: payload.userTo,
    productFrom: payload.productFrom,
    productTo: payload.productTo,
  });
};
const pendingSwap = async (req: Request) => {
  const { userId } = req.user as IReqUser;
  const swaps = await Swap.find({ userFrom: userId });

  return swaps;
};
const swapDetails = async (id: string) => {
  return await Swap.findById(id).populate('productFrom').populate('productTo');
};
const approveSwap = async (req: Request) => {
  const { id } = req.params;
  const user = req.user as IReqUser;
  const isExist = await Swap.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Product not found');
  }
  const isExistPoint = await Point.findOne({ user: user.userId });
  console.log(isExistPoint);
  return await Swap.findByIdAndUpdate(
    id,
    { isApproved: 'approved' },
    { new: true },
  );
};
const rejectSwap = async (id: string) => {
  const isExist = await Swap.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Product not found');
  }
  return await Swap.findByIdAndUpdate(
    id,
    { isApproved: 'rejected' },
    { new: true },
  );
};
export const SwapService = {
  makeSwap,
  pendingSwap,
  swapDetails,
  approveSwap,
  rejectSwap,
};
