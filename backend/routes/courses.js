import express from 'express';
import { createCourse, deleteCourse, getAllCourse, getSingleCourse, getCourseBySearch, getCourseCount, updateCourse } from '../controllers/courseController.js';

const router = express.Router();

// Create a new course
router.post('/',createCourse);

// Update a course by id
router.put('/:id',updateCourse);

// Delete a course by id
router.delete('/:id',deleteCourse);

// Get a single course by id
router.get('/:id',getSingleCourse);

// Get All Courses for pagination
router.get('/',getAllCourse);

// Get Course By Searching for description and price
router.get("/search/getCourseBySearch",getCourseBySearch);

// Get Course count for pagination
router.get("/search/getCourseCount",getCourseCount);

export default router;