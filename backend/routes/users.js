import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
const router = express.Router()

// Update user by id
router.put('/:id',updateUser);

// Delete  user by id
router.delete('/:id',deleteUser);

// Get single user by id
router.get('/:id',getSingleUser);

// Get All Users
router.get('/',getAllUser);

export default router