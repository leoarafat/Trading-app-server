import { model, Schema } from 'mongoose';
import { ISwap } from './swap.interface';

const swapSchema = new Schema<ISwap>(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productFrom: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productTo: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    isApproved: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);
export const Swap = model('Swap', swapSchema);
