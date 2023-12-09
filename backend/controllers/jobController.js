import Job from '../models/Job.js' 

// Create a new job
export const createJob = async (req,res) => {

    // Get job details from request body
    const newJob = new Job(req.body)

    try{
        // Try saving the job in db
        const savedJob = await newJob.save()

        // Return 200 in case of success
        res.status(200).json({success:true, message:'Successfully created',data:savedJob});
    }
    catch(err){
        // Return error in case of failures
        res.status(500).json({success:false, message:'Failed to create. Title already exists'});
    }
};

// Update a job
export const updateJob = async (req,res) => {

    // Get job id from request params
    const id = req.params.id;

    try{
        // Try updating job with new details
        const updatedJob = await Job.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        // Return 200 in case of success
        res.status(200).json({success:true, message:'Successfully updated',data:updatedJob});
    }
    catch(err){
        // Return error in case of failures
        res.status(500).json({success:false, message:'Failed to update. Title already exists'});
    }
};

// Delete a Job
export const deleteJob = async (req,res) => {

    // Get job id from request params
    const id = req.params.id;

    try{
        // Try to find the job and delete it
        await Job.findByIdAndDelete(id);

        // Return 200 in case of success
        res.status(200).json({success:true, message:'Successfully Deleted'});
    }
    catch(err){
        // Return error in case of failures
        res.status(500).json({success:false, message:'Failed to Delete'});
    }
};

// Get Single Job by its ID
export const getSingleJob = async (req,res) => {
    // Get job id from query params
    const id = req.params.id;
       
    // Try fetching the job
    const job = await Job.findById(id).populate('applications');;
    
    // Return 200 in case of success
    res.status(200).json({success:true, message:'Successful',data:job});
};

// Get All Jobs for pagination
export const getAllJob = async (req,res) => {

    // Get page number for pagination
    const page = parseInt(req.query.page)

    try{
        // Get jobs using pagination
        const jobs = await Job.find({})
            .populate('applications')
            .skip(page*8)
            .limit(8)

        // Return 200 in case of success
        res.status(200).json({success:true, count:jobs.length,message:'Successful',data:jobs});
    }
    catch(err){
        // Return errors in case of failures
        res.status(404).json({success:false, message:'Not Found'});
    }
};

// Search job by city, salary and company size
export const getJobBySearch = async(req,res) =>{

    // Get details from query params
    const city = new RegExp(req.query.city,'i') 
    const salary  = parseInt(req.query.salary)
    const companySize = new RegExp(req.query.companySize, 'i');

    try{
        // Try searching for job with above values
        const jobs = await Job.find({city, salary:{$lte: salary}, companySize});

        // Return 200 in case of success
        res.status(200).json({success:true, message:'Successful',data:jobs});
    }
    catch(err){
        // Return error in case of failures
        res.status(404).json({success:false, message:'getJobBySearch not Found'});
    }
};


// //Get Featured Job
// export const getFeaturedJob = async (req,res) => {

//     //for Pagination 
//     try{
//         const jobs = await Job.find({featured:true}).populate('applications').limit(8)

//         res.status(200).json({success:true,message:'Successful',data:jobs});

//     }
//     catch(err){
//         res.status(404).json({success:false, message:'Not Found'});
//     }
// };

//Get Job Count for pagination
export const getJobCount = async (req,res) =>{
    try{
        // Fetch and return the total job count
        const jobCount = await Job.estimatedDocumentCount();
        res.status(200).json({success:true,data:jobCount});
    }
    catch(err){
        // Return error in case of failures
        res.status(404).json({success:false, message:'Failed To Fetch'});
    }
}