import express from 'express';
import { sendEmail } from '../controllers/sendEmail.js';
const router = express.Router();

//Send Email
router.post('/',sendEmail);

export default router;