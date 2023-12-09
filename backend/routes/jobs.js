import express from 'express';
import { createJob, deleteJob, getAllJob, getSingleJob, getJobBySearch, getJobCount, updateJob } from '../controllers/jobController.js';

import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new job
router.post('/',createJob);

// Update job by id
router.put('/:id',verifyAdmin,updateJob);

// Delete job by id
router.delete('/:id',verifyAdmin,deleteJob);

// Get single job by id
router.get('/:id',getSingleJob);

// Get All Job for pagination
router.get('/',getAllJob);

// Get Job By Searching for city, salary and company size
router.get("/search/getJobBySearch",getJobBySearch);

// Get Job Count for pagination
router.get("/search/getJobCount",getJobCount);

export default router;