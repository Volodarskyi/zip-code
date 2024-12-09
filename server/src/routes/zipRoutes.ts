import { Router } from 'express';
import zipController from '../controllers/zipController';

const router = Router();

router.post('/address', zipController.getAddressByZip);

export default router;
