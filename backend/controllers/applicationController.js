import Job from "../models/Job.js";
import Application from "../models/Application.js"
import { ObjectId } from "mongodb";


export const createApplication = async(req, res) =>{

    const jobId = req.params.jobId

    const newApplication = new Application({ ...req.body})

    try{
        const savedApplication = await newApplication.save()

        await Job.findByIdAndUpdate(jobId,{
            $push: {applications: savedApplication._id}
        })
        
        res.status(200).json({success:true, message:'Application submitted', data:savedApplication});

    } catch(err) {
        res.status(500).json({success:true, message:'failed to submit'});
    }
}


export const getAppBySearch = async(req,res) =>{
    const jobName = new RegExp(req.query.jobName,'i'); //i means case sensitive    
    const userId  = new RegExp(req.query.userId, 'i');
    // const maxGroupSize = parseInt(req.query.maxGroupSize)

    try{
        const application = await Application.find({jobName, userId});
        console.log(application);
        if(application.length !== 0){
            res.status(200).json({success:true, message:'Succesful',data:application});
        }else{
            res.status(200).json({success:false, message:'getTourBySearch not Found'});
        }
        
    }
    catch(err){
        res.status(200).json({success:false, message:'getTourBySearch not Found'});
    }
};


//new
export const getAllApplication = async (req,res) => {

    //for Pagination 
    const page = parseInt(req.query.page)

    try{
        const applications = await Application.find({})
            // .populate('applications')
            .skip(page*8)
            .limit(8)

        res.status(200).json({success:true, count:applications.length,message:'Succesful',data:applications});

    }
    catch(err){
        res.status(404).json({success:false, message:'Not Found'});
    }
};

export const getApplicationCount = async (req,res) =>{
    try{
        const applicationCount = await Application.estimatedDocumentCount();
        res.status(200).json({success:true,data:applicationCount});

    }
    catch(err){
        res.status(404).json({success:false, message:'Failed To Fetch'});
    }
}

export const getApplicationBySearch = async(req,res) =>{
    // const companySize = new RegExp(req.query.companySize, 'i');

    const receipt = new ObjectId(req.query.receipt);

    try{
        console.log(req.query.receipt);
        console.log("check 1");
         //i means case sensitive    
        console.log("check 2");
        console.log(receipt);

        //gte is greater than equal to
        const applications = await Application.find({'_id': receipt});
        res.status(200).json({success:true, message:'Successful',data:applications});

    }
    catch(err){
        res.status(200).json({success:false, message:'getCourseBySearch not Found', data:[]});

    }
};

export const deleteApplication = async (req,res) => {
    const id = req.params.id;
    try{
        await Application.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfully Deleted'});

    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to Delete'});
    }

};
