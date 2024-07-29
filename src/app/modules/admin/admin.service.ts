/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import httpStatus from 'http-status';
import QueryBuilder from '../../../builder/QueryBuilder';
import { IGenericResponse } from '../../../interfaces/paginations';
import { IAdmin } from './admin.interface';
import { sendResetEmail } from '../auth/sendResetMails';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { Request } from 'express';
import { IRegistration, IReqUser, IUser } from '../auth/auth.interface';
import User from '../auth/auth.model';

//!
const registerAdmin = async (payload: IRegistration) => {
  const { email, password, confirmPassword } = payload;
  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and ConfirmPassword didn't match");
  }
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new ApiError(400, 'Email already exist');
  }
  payload.role = 'ADMIN';
  const newUser = await User.create(payload);
  const { password: omit, ...userWithoutPassword } = newUser.toObject();
  return userWithoutPassword;
};

const getAllAdmin = async () => {
  const results = await User.find({ role: 'ADMIN' }).lean();
  return results;
};

export const AdminService = {
  registerAdmin,
  getAllAdmin,
};
