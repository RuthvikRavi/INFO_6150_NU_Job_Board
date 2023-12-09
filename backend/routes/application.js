
import express from 'express'
import { createApplication, getAppBySearch, getAllApplication, getApplicationBySearch, getApplicationCount, deleteApplication } from '../controllers/applicationController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// Create a new application, only for logged in users
router.post('/:jobId', verifyUser, createApplication)

// Get applications by details
router.get("/search/getAppBySearch",getAppBySearch);

// Get all applications for pagination
router.get('/',getAllApplication);

// Get application count for display
router.get("/search/getApplicationCount",getApplicationCount);

// Get application by id
router.get("/search/getApplicationBySearch",getApplicationBySearch);

// Delete application by id
router.delete('/:id', deleteApplication);

export default router