import { Request, Response } from 'express';
import canadianPostService from '../services/CanadianPostService';

async function getAddressByZip(
  req: Request<{ zipCode: string }>,
  res: Response,
) {
  try {
    const { body } = req;
    const { zipCode } = body;
    console.log('CONTROLLER zip code:', zipCode);

    if (!zipCode) {
      console.log('Controller.Bad Request. Check zip code', zipCode);
      throw new Error(`Bad Request. Check zip code`);
    }
    const address = await canadianPostService.getAddressByZip(zipCode);
    res.json(address);
  } catch (error) {
    console.error('getAddressByZip', error?.toString());
  }
}

export default {
  getAddressByZip,
};
