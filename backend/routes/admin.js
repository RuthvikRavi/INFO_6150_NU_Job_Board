import express from 'express'
import { createAdmin, makeAdmin} from '../controllers/adminController.js';
const router = express.Router()

// Convert a user into admin
router.put('/:id',makeAdmin);

// Create a new admin
router.post('/',createAdmin);

export default router