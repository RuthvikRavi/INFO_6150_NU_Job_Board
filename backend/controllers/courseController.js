import Course from '../models/Course.js' 

//create new course
export const createCourse = async (req,res) => {
    const newCourse = new Course(req.body)

    try{
        const savedCourse = await newCourse.save()

        res.status(200).json({success:true, message:'Successfully created',data:savedCourse});
    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to create'});

    }
};

//update course
export const updateCourse = async (req,res) => {
    const id = req.params.id;
    try{
        const updatedCourse = await Course.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message:'Successfully updated',data:updatedCourse});

    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to update'});

    }
};



//delete Course
export const deleteCourse = async (req,res) => {
    const id = req.params.id;
    try{
        await Course.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfully Deleted'});

    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to Delete'});
    }

};



//Get Single Course
export const getSingleCourse = async (req,res) => {
    const id = req.params.id;
    // try{
       
    const course = await Course.findById(id).populate('subscriptions');;
    console.log(course);
    // const course = await Course.findById(id);

    const course2 = await Course.findById(id).populate('subscriptions');
    console.log(course2);
    res.status(200).json({success:true, message:'Succesful',data:course});

    // }
    // catch(err){
    //     res.status(404).json({success:false, message:err});
    // }


};

//Get All Course
export const getAllCourse = async (req,res) => {

    //for Pagination 
    const page = parseInt(req.query.page)

    try{
        const courses = await Course.find({})
            .populate('subscriptions')
            .skip(page*8)
            .limit(8)

        res.status(200).json({success:true, count:courses.length,message:'Succesful',data:courses});

    }
    catch(err){
        res.status(404).json({success:false, message:'Not Found'});
    }
};

export const getCourseBySearch = async(req,res) =>{
    const desc = new RegExp(req.query.desc,'i') //i means case sensitive    
    const price  = parseInt(req.query.price)
    // const companySize = new RegExp(req.query.companySize, 'i');

    try{

        //gte is greater than equal to
        const courses = await Course.find({desc, price:{$lte: price}});
        res.status(200).json({success:true, message:'Successful',data:courses});

    }
    catch(err){
        res.status(404).json({success:false, message:'getCourseBySearch not Found'});

    }
};


//Get Featured Course
export const getFeaturedCourse = async (req,res) => {

    //for Pagination 
    try{
        const courses = await Course.find({featured:true}).populate('applications').limit(8)

        res.status(200).json({success:true,message:'Succesful',data:courses});

    }
    catch(err){
        res.status(404).json({success:false, message:'Not Found'});
    }
};

//Get Course Counts
export const getCourseCount = async (req,res) =>{
    try{
        const courseCount = await Course.estimatedDocumentCount();
        res.status(200).json({success:true,data:courseCount});

    }
    catch(err){
        res.status(404).json({success:false, message:'Failed To Fetch'});
    }
}