import { JwtPayload } from 'jsonwebtoken';
import { IProducts } from './products.interface';
import ApiError from '../../../errors/ApiError';
import { Product } from './products.model';
import { Category } from '../category/category.model';
import { SubCategory } from '../sub-category/sub-category.model';
import User from '../auth/auth.model';
import QueryBuilder from '../../../builder/QueryBuilder';

const insertIntoDB = async (
  files: any,
  payload: IProducts,
  user: JwtPayload,
) => {
  if (!files?.image) {
    throw new ApiError(400, 'File is missing');
  }
  const checkIsExistCategory = await Category.findById(payload.category);
  if (!checkIsExistCategory) {
    throw new ApiError(400, 'Category not found');
  }
  const checkIsExistSubCategory = await SubCategory.findById(
    payload.subCategory,
  );
  if (!checkIsExistSubCategory) {
    throw new ApiError(400, 'Sub Category not found');
  }
  const existUser = await User.findById(user.userId);
  if (!existUser) {
    throw new ApiError(400, 'User not found');
  }
  if (files?.image) {
    const images = files.image.map(
      (file: any) => `/images/image/${file.filename}`,
    );
    payload.images = images;
  }
  payload.user = user.userId;
  return await Product.create(payload);
};
const products = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Product.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
const myProducts = async (user: JwtPayload, query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(
    Product.find({ user: user.userId }),
    query,
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
export const ProductService = {
  insertIntoDB,
  products,
  myProducts,
};
