import { NextFunction, Request, Response } from 'express';
import canadianPostService from '../services/CanadianPostService';
import { AppError } from '../utils/errorHandler';

// Validation canadian zip code
const isValidZipCode = (zipCode: string): boolean => {
  const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return regex.test(zipCode);
};

async function getAddressByZip(
  req: Request<{ zipCode: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { body } = req;
    const { zipCode } = body;

    if (!zipCode) {
      throw new AppError('Bad Request: Missing zip code', 400);
    }

    if (!isValidZipCode(zipCode)) {
      throw new AppError('Bad Request: Invalid Canadian ZIP code format', 400);
    }

    const address = await canadianPostService.getAddressByZip(zipCode);

    if (!address) {
      throw new AppError(`No address found for ZIP code: ${zipCode}`, 404);
    }

    res.json(address);
  } catch (error) {
    next(error); // Forward error to the global error handler
  }
}

export default {
  getAddressByZip,
};
