import express from 'express';
import { getWindAnalytics } from '../controllers/windController.js';
import { validateWindParams } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/').get(validateWindParams, getWindAnalytics);

export default router;
