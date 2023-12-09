
import express from 'express'
import { createSubscription, getAllSubscription, getAppBySearch, getSubscriptionCount, getSubscriptionBySearch, deleteSubscription } from '../controllers/subscriptionController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// Get subscriptions by course id
router.post('/:courseId', verifyUser, createSubscription)

// Search subscriptions by user id and course title
router.get("/search/getAppBySearch",getAppBySearch);

// Get all subscriptions for pagination
router.get('/',getAllSubscription);

// Get subscription count for pagination
router.get("/search/getSubscriptionCount",getSubscriptionCount);

// Search subscriptions by id
router.get("/search/getSubscriptionBySearch",getSubscriptionBySearch);

// Delete subscription by id
router.delete('/:id', deleteSubscription);



export default router