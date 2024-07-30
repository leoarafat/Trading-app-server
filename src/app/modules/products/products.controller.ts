import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { ProductService } from './products.service';
import sendResponse from '../../../shared/sendResponse';
import { IProducts } from './products.interface';
import { JwtPayload } from 'jsonwebtoken';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.insertIntoDB(
    req.files,
    req.body,
    req.user as JwtPayload,
  );
  sendResponse<IProducts>(res, {
    statusCode: 200,
    success: true,
    message: 'Product create successfully',
    data: result,
  });
});

export const ProductController = {
  insertIntoDB,
};
