import { ObjectId } from "mongodb";
import Course from "../models/Course.js";
import Subscription from "../models/Subscription.js"

// Create a new subscription
export const createSubscription = async(req, res) =>{

    // Fetch the related coourse id
    const courseId = req.params.courseId

    // Fetch the subscription's request body
    const newSubscription = new Subscription({ ...req.body})

    try{
        // Try saving the new subscription in db
        const savedSubscription = await newSubscription.save()

        // Update the course's subscription array
        await Course.findByIdAndUpdate(courseId,{
            $push: {subscriptions: savedSubscription._id}
        })
        
        // Return 200 in case of success
        res.status(200).json({success:true, message:'Subscription submitted', data:savedSubscription});
    } catch(err) {

        // Return error in case of any failures
        res.status(500).json({success:true, message:'failed to submit'});
    }
}

// Search subscription by the course name and user id
export const getAppBySearch = async(req,res) =>{

    // Get details from query params 
    const courseName = new RegExp(req.query.courseName,'i'); 
    const userId  = new RegExp(req.query.userId, 'i');

    try{
        // Try fetching the subscription
        const subscription = await Subscription.find({courseName, userId});
        
        if(subscription.length !== 0){
            // Return 200 on successful fetch
            res.status(200).json({success:true, message:'Succesful',data:subscription});
        }else{
            // Return error in case of non existence
            res.status(200).json({success:false, message:'getSubscriptionBySearch not Found'});
        }
    }
    catch(err){
        // Return error in case of any other failures
        res.status(200).json({success:false, message:'getSubscriptionBySearch not Found'});
    }
};

// Get subscriptions by pagination
export const getAllSubscription = async (req,res) => {

    // Get page number 
    const page = parseInt(req.query.page)

    try{
        // Try fetching subscriptions according to page number
        const subscriptions = await Subscription.find({})
            // .populate('applications')
            .skip(page*8)
            .limit(8)

        // Return 200 in case of success
        res.status(200).json({success:true, count:subscriptions.length,message:'Succesful',data:subscriptions});
    }
    catch(err){
        // Return error in case of failures
        res.status(404).json({success:false, message:'Not Found'});
    }
};

// Get total subscription count for pagination
export const getSubscriptionCount = async (req,res) =>{
    try{
        // Try fetching total count and return the count
        const subscriptionCount = await Subscription.estimatedDocumentCount();
        res.status(200).json({success:true,data:subscriptionCount});
    }
    catch(err){
        // Return errors in case of failures
        res.status(404).json({success:false, message:'Failed To Fetch'});
    }
}

// Search for subscription based on receipt id
export const getSubscriptionBySearch = async(req,res) =>{

    try{
        // Get the subscription id
        const receipt = new ObjectId(req.query.receipt); 

        // Fetch and return subscription along with success code
        const subscriptions = await Subscription.find({'_id': receipt});
        res.status(200).json({success:true, message:'Successful',data:subscriptions});
    }
    catch(err){
        // Return failure message on errors
        res.status(200).json({success:false, message:'getCourseBySearch not Found', data:[]});

    }
};

// Delete a subscription
export const deleteSubscription = async (req,res) => {

    // Get the subscription id
    const id = req.params.id;
    try{
        // Try deleting the subscription
        await Subscription.findByIdAndDelete(id);

        // Return success in case of successful delete
        res.status(200).json({success:true, message:'Successfully Deleted'});
    }
    catch(err){
        // Return error in case of any failures
        res.status(500).json({success:false, message:'Failed to Delete'});
    }
};

