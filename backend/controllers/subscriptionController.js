import { ObjectId } from "mongodb";
import Course from "../models/Course.js";
import Subscription from "../models/Subscription.js"

export const createSubscription = async(req, res) =>{

    console.log("hello");
    const courseId = req.params.courseId

    console.log(courseId);
    const newSubscription = new Subscription({ ...req.body})

    console.log(newSubscription);
    try{
        const savedSubscription = await newSubscription.save()

        await Course.findByIdAndUpdate(courseId,{
            $push: {subscriptions: savedSubscription._id}
        })
        
        res.status(200).json({success:true, message:'Subscription submitted', data:savedSubscription});

    } catch(err) {
        res.status(500).json({success:true, message:'failed to submit'});
    }
}


export const getAppBySearch = async(req,res) =>{
    const courseName = new RegExp(req.query.courseName,'i'); //i means case sensitive    
    const userId  = new RegExp(req.query.userId, 'i');
    // const maxGroupSize = parseInt(req.query.maxGroupSize)

    try{
        const subscription = await Subscription.find({courseName, userId});
        console.log(subscription);
        if(subscription.length !== 0){
            res.status(200).json({success:true, message:'Succesful',data:subscription});
        }else{
            res.status(200).json({success:false, message:'getTourBySearch not Found'});
        }
        
    }
    catch(err){
        res.status(200).json({success:false, message:'getTourBySearch not Found'});
    }
};

export const getAllSubscription = async (req,res) => {

    //for Pagination 
    const page = parseInt(req.query.page)

    try{
        const subscriptions = await Subscription.find({})
            // .populate('applications')
            .skip(page*8)
            .limit(8)

        res.status(200).json({success:true, count:subscriptions.length,message:'Succesful',data:subscriptions});

    }
    catch(err){
        res.status(404).json({success:false, message:'Not Found'});
    }
};

export const getSubscriptionCount = async (req,res) =>{
    try{
        const subscriptionCount = await Subscription.estimatedDocumentCount();
        res.status(200).json({success:true,data:subscriptionCount});

    }
    catch(err){
        res.status(404).json({success:false, message:'Failed To Fetch'});
    }
}

export const getSubscriptionBySearch = async(req,res) =>{
    // const companySize = new RegExp(req.query.companySize, 'i');

    try{
        const receipt = new ObjectId(req.query.receipt); //i means case sensitive    

        //gte is greater than equal to
        const subscriptions = await Subscription.find({'_id': receipt});
        res.status(200).json({success:true, message:'Successful',data:subscriptions});

    }
    catch(err){
        res.status(200).json({success:false, message:'getCourseBySearch not Found', data:[]});

    }
};

export const deleteSubscription = async (req,res) => {
    const id = req.params.id;
    try{
        await Subscription.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfully Deleted'});

    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to Delete'});
    }

};

