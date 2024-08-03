import { JwtPayload } from 'jsonwebtoken';
import { IProducts } from './products.interface';
import ApiError from '../../../errors/ApiError';
import { Product } from './products.model';
import { Category } from '../category/category.model';
import { SubCategory } from '../sub-category/sub-category.model';
import User from '../auth/auth.model';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Request } from 'express';

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
const updateProduct = async (req: Request) => {
  const { files } = req as any;
  const id = req.params.id;
  const productImage = [];

  if (files && 'image' in files && files.image.length) {
    for (const image of files.image) {
      productImage.push(`/images/image/${image.filename}`);
    }
  }

  const isExist = await Product.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, 'Product not found !');
  }

  const updateData = {
    ...req.body,
    images: productImage,
  };

  const result = await Product.findOneAndUpdate(
    { _id: id },
    { ...updateData },
    {
      new: true,
    },
  );
  return result;
};
const deleteProduct = async (id: string) => {
  const isExist = await Product.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, 'Product not found !');
  }
  return await Product.findByIdAndDelete(id);
};
const singleProduct = async (id: string) => {
  const result = await Product.findById(id).populate([
    {
      path: 'category',
      select: 'name',
    },
    {
      path: 'subCategory',
      select: 'name',
    },
  ]);
  const similarProduct = await Product.find({
    subCategory: result?.subCategory,
  });
  return { product: result, similarProduct };
};
export const ProductService = {
  insertIntoDB,
  products,
  myProducts,
  updateProduct,
  deleteProduct,
  singleProduct,
};
