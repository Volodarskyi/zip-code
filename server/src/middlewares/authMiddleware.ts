import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler';

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError('Authorization header is missing!', 401);
    }

    const token = authorization.split(' ')[1]; // Extract token after "Bearer"

    if (!token) {
      throw new AppError('Token is missing!', 401);
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      throw new AppError('Invalid Token!', 401);
    }

    next();
  } catch (error) {
    console.error('Error in auth middleware:', (error as Error).message);
    next(error);
  }
};

export default authMiddleware;
