import express from 'express';
import { getAiStylistResponse } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', getAiStylistResponse);

export default router;