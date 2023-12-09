import Course from '../models/Course.js' 

// Create a new course
export const createCourse = async (req,res) => {

    // Get course details from request body
    const newCourse = new Course(req.body)

    try{
        // Try saving the new course in db
        const savedCourse = await newCourse.save()

        // Return 200OK on successful save
        res.status(200).json({success:true, message:'Successfully created',data:savedCourse});
    }
    catch(err){
        // Return error in case of any failures
        res.status(500).json({success:false, message:'Failed to create. Title name already exists'});
    }
};

// Update a course
export const updateCourse = async (req,res) => {

    // Get the course id from request params
    const id = req.params.id;

    try{
        // Find the course and replace it contents with those in request body
        const updatedCourse = await Course.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        // Return 200OK in case of successful update
        res.status(200).json({success:true, message:'Successfully updated',data:updatedCourse});
    }
    catch(err){
        // Return error in case of any failures
        res.status(500).json({success:false, message:'Failed to update. Title name already exists'});
    }
};

// Delete a Course
export const deleteCourse = async (req,res) => {
    // Get the course id from request params
    const id = req.params.id;

    try{
        // Find the course and try deleting it
        await Course.findByIdAndDelete(id);

        // Return 200OK in case of successful deletion
        res.status(200).json({success:true, message:'Successfully Deleted'});
    }
    catch(err){
        // Return error in case of any failures
        res.status(500).json({success:false, message:'Failed to Delete'});
    }
};



//Get Single Course
export const getSingleCourse = async (req,res) => {

    // Get course id from request params
    const id = req.params.id;
       
    // Try finding the course by its id
    const course = await Course.findById(id).populate('subscriptions');;
    
    // Return 200 in case of success
    res.status(200).json({success:true, message:'Successful',data:course});

};

// Getting All Courses for pagination
export const getAllCourse = async (req,res) => {

    // Get page number from query params for pagination
    const page = parseInt(req.query.page)

    try{
        // Try getting the courses on the nth page
        const courses = await Course.find({})
            .populate('subscriptions')
            .skip(page*8)
            .limit(8)

        // Return 200OK along with courses in case of success
        res.status(200).json({success:true, count:courses.length,message:'Successful',data:courses});
    }
    catch(err){
        // Return error in case of failures
        res.status(404).json({success:false, message:'Not Found'});
    }
};

// Search a course by its description and price
export const getCourseBySearch = async(req,res) =>{

    // Get the description keywords and maximum price from query params
    const desc = new RegExp(req.query.desc,'i') 
    const price  = parseInt(req.query.price)

    try{
        // Try searching for courses using above parameters
        const courses = await Course.find({desc, price:{$lte: price}});

        // Return 200 in case of success
        res.status(200).json({success:true, message:'Successful',data:courses});
    }
    catch(err){
        // Return error in case of any failures
        res.status(404).json({success:false, message:'getCourseBySearch not Found'});
    }
};

// //Get Featured Course
// export const getFeaturedCourse = async (req,res) => {

//     //for Pagination 
//     try{
//         const courses = await Course.find({featured:true}).populate('applications').limit(8)

//         res.status(200).json({success:true,message:'Succesful',data:courses});

//     }
//     catch(err){
//         res.status(404).json({success:false, message:'Not Found'});
//     }
// };

// Get the Course Count
export const getCourseCount = async (req,res) =>{
    try{
        // Try getting course document count from the db
        const courseCount = await Course.estimatedDocumentCount();

        // Return 200 along with count in case of success
        res.status(200).json({success:true,data:courseCount});
    }
    catch(err){
        // Return error in case of failures
        res.status(404).json({success:false, message:'Failed To Fetch'});
    }
}