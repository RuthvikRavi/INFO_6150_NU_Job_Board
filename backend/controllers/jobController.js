import Job from '../models/Job.js' 

//create new job
export const createJob = async (req,res) => {
    const newJob = new Job(req.body)

    try{
        const savedJob = await newJob.save()

        res.status(200).json({success:true, message:'Successfully created',data:savedJob});
    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to create'});

    }
};

//update job
export const updateJob = async (req,res) => {
    const id = req.params.id;
    try{
        const updatedJob = await Job.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message:'Successfully updated',data:updatedJob});

    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to update'});

    }
};



//delete Job
export const deleteJob = async (req,res) => {
    const id = req.params.id;
    try{
        await Job.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfully Deleted'});

    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to Delete'});
    }

};



//Get Single Job
export const getSingleJob = async (req,res) => {
    const id = req.params.id;
    // try{
       
    const job = await Job.findById(id).populate('applications');;
    console.log(job);
    // const job = await Job.findById(id);

    const job2 = await Job.findById(id).populate('applications');
    console.log(job2);
    res.status(200).json({success:true, message:'Succesful',data:job});

    // }
    // catch(err){
    //     res.status(404).json({success:false, message:err});
    // }


};

//Get All Job
export const getAllJob = async (req,res) => {

    //for Pagination 
    const page = parseInt(req.query.page)

    try{
        const jobs = await Job.find({})
            .populate('applications')
            .skip(page*8)
            .limit(8)

        res.status(200).json({success:true, count:jobs.length,message:'Succesful',data:jobs});

    }
    catch(err){
        res.status(404).json({success:false, message:'Not Found'});
    }
};

export const getJobBySearch = async(req,res) =>{
    const city = new RegExp(req.query.city,'i') //i means case sensitive    
    const salary  = parseInt(req.query.salary)
    const companySize = new RegExp(req.query.companySize, 'i');

    try{

        //gte is greater than equal to
        const jobs = await Job.find({city, salary:{$lte: salary}, companySize});
        res.status(200).json({success:true, message:'Succesful',data:jobs});

    }
    catch(err){
        res.status(404).json({success:false, message:'getJobBySearch not Found'});

    }
};


//Get Featured Job
export const getFeaturedJob = async (req,res) => {

    //for Pagination 
    try{
        const jobs = await Job.find({featured:true}).populate('applications').limit(8)

        res.status(200).json({success:true,message:'Succesful',data:jobs});

    }
    catch(err){
        res.status(404).json({success:false, message:'Not Found'});
    }
};

//Get Job Counts
export const getJobCount = async (req,res) =>{
    try{
        const jobCount = await Job.estimatedDocumentCount();
        res.status(200).json({success:true,data:jobCount});

    }
    catch(err){
        res.status(404).json({success:false, message:'Failed To Fetch'});
    }
}