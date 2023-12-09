import Job from "../models/Job.js";
import Application from "../models/Application.js"
import { ObjectId } from "mongodb";

// Function to create a new application
export const createApplication = async(req, res) =>{

    // Get the job id and application body from params and request body
    const jobId = req.params.jobId
    const newApplication = new Application({ ...req.body})

    try{

        // Try saving the new application and updating the job applications array in jobs
        const savedApplication = await newApplication.save()
        await Job.findByIdAndUpdate(jobId,{
            $push: {applications: savedApplication._id}
        })
        
        // Return 200 OK in case of successful save and update
        res.status(200).json({success:true, message:'Application submitted', data:savedApplication});
    } catch(err) {
        // Return error in case of any errors
        res.status(500).json({success:true, message:'failed to submit'});
    }
}

// Function to fetch the application on the basis of job title and user's id
export const getAppBySearch = async(req,res) =>{

    // Get the job title and user id from request params
    const jobName = new RegExp(req.query.jobName,'i'); 
    const userId  = new RegExp(req.query.userId, 'i');

    try{
        // Try to search for the application using the above two values
        const application = await Application.find({jobName, userId});

        if(application.length !== 0){
            // If applications exist, return 200 OK along with application data
            res.status(200).json({success:true, message:'Successful',data:application});
        }else{
            // If applications do not exist throw error
            res.status(200).json({success:false, message:'getTourBySearch not Found'});
        }
    }
    catch(err){
        // Return error in case of any other errors
        res.status(200).json({success:false, message:'getTourBySearch not Found'});
    }
};

// Function to fetch all applications for pagination
export const getAllApplication = async (req,res) => {

    // Get the page number for pagination 
    const page = parseInt(req.query.page)

    try{

        // Retrieve the applications on the nth page
        const applications = await Application.find({})
            // .populate('applications')
            .skip(page*8)
            .limit(8)

        // Return 200 OK and applications in response body on successful fetch
        res.status(200).json({success:true, count:applications.length,message:'Successful',data:applications});
    }
    catch(err){
        // Return error in case of any failures
        res.status(404).json({success:false, message:'Not Found'});
    }
};

// Function to get total application count for pagination
export const getApplicationCount = async (req,res) =>{
    try{
        // Try getting the estimated count using in-built mongodb functions
        const applicationCount = await Application.estimatedDocumentCount();

        // Return 200OK and application count on successful fetch
        res.status(200).json({success:true,data:applicationCount});
    }
    catch(err){
        // Return error in case of any errors
        res.status(404).json({success:false, message:'Failed To Fetch'});
    }
}

export const getApplicationBySearch = async(req,res) =>{

    // Get the application receipt number from query params
    const receipt = new ObjectId(req.query.receipt);

    try{
        // Try fetching the application using application receipt number
        const applications = await Application.find({'_id': receipt});

        // Return 200 and application data on successful fetch
        res.status(200).json({success:true, message:'Successful',data:applications});
    }
    catch(err){
        // Return error in case of any errors
        res.status(200).json({success:false, message:'getCourseBySearch not Found', data:[]});
    }
};

// Function to delete any application by its id
export const deleteApplication = async (req,res) => {

    // Get the application id from the request params
    const id = req.params.id;

    try{
        // Try deleting the application using its ID
        await Application.findByIdAndDelete(id);

        // Return 200OK in case of success
        res.status(200).json({success:true, message:'Successfully Deleted'});
    }
    catch(err){
        // Return error in case of any failures
        res.status(500).json({success:false, message:'Failed to Delete'});
    }
};
