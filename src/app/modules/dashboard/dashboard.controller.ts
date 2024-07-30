import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { DashboardService } from './dashboard.service';
import sendResponse from '../../../shared/sendResponse';

const totalCount = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.totalCount();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved successfully',
    data: result,
  });
});
const Analytics = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.Analytics();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: result,
  });
});
export const DashboardController = {
  totalCount,
  Analytics,
};
