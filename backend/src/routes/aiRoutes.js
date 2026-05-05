import express from 'express';
import { getAiStylistResponse, getCompleteTheLook } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', getAiStylistResponse);
router.get('/recommendations/:productId', getCompleteTheLook); 
export default router;