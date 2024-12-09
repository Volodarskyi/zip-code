import { NextFunction, Request, Response } from 'express';

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`Error: ${message}, StatusCode: ${statusCode}`);

  res.status(statusCode).json({
    code: statusCode,
    error: message,
  });
};

export { AppError, errorHandler };
