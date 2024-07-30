import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { AddsService } from './media.service';
import { IAdds } from './media.interface';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AddsService.insertIntoDB(req.files, req.body);
  sendResponse<IAdds>(res, {
    statusCode: 200,
    success: true,
    message: 'Adds create successfully',
    data: result,
  });
});
const updateAdds = catchAsync(async (req: Request, res: Response) => {
  const result = await AddsService.updateAdds(req);
  sendResponse<IAdds>(res, {
    statusCode: 200,
    success: true,
    message: 'Adds update successfully',
    data: result,
  });
});
const deleteAdds = catchAsync(async (req: Request, res: Response) => {
  const result = await AddsService.deleteAdds(req.params.id);
  sendResponse<IAdds>(res, {
    statusCode: 200,
    success: true,
    message: 'Adds delete successfully',
    data: result,
  });
});
const allAdds = catchAsync(async (req: Request, res: Response) => {
  const result = await AddsService.allAdds(req.query);
  sendResponse<IAdds[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Adds Retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AddsController = {
  allAdds,
  insertIntoDB,
  updateAdds,
  deleteAdds,
};
