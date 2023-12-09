import User from '../models/User.js' 

// Create new User
export const createUser = async (req,res) => {

    // Get user details from body
    const newUser = new User(req.body)

    try{
        // Try creating a new user in db
        const savedUser = await newUser.save()

        // Return 200 if successful
        res.status(200).json({success:true, message:'Successfully created',data:savedUser});
    }
    catch(err){
        // Return error if failures
        res.status(500).json({success:false, message:'Failed to create'});

    }
};

// Update User
export const updateUser = async (req,res) => {

    // Get user id
    const id = req.params.id;
    try{
        // Try updating the user details
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        // Return 200 on success
        res.status(200).json({success:true, message:'Successfully updated',data:updatedUser});
    }
    catch(err){
        // Return error on failures
        res.status(500).json({success:false, message:'Failed to update'});
    }
};

// Delete User
export const deleteUser = async (req,res) => {
    // Fetch user id from query params
    const id = req.params.id;
    try{
        // Try deleting the user
        await User.findByIdAndDelete(id);

        // Return 200 on successful delete
        res.status(200).json({success:true, message:'Successfully Deleted'});
    }
    catch(err){
        // Return errors on failures
        res.status(500).json({success:false, message:'Failed to Delete'});
    }
};

// Get a Single User
export const getSingleUser = async (req,res) => {

    // Get user id from query params
    const id = req.params.id;
    try{
        // Try fetching the user by its id
        const user = await User.findById(id);

        // Return 200 with user details in case of success
        res.status(200).json({success:true, message:'Successful',data:user});
    }
    catch(err){
        // Return error in case of failures
        res.status(404).json({success:false, message:'Not Found'});
    }
};

// Get All Users
export const getAllUser = async (req,res) => {
    try{
        // Try fetching all user
        const users = await User.find({})

        // Return 200 with data in case of success
        res.status(200).json({success:true,message:'Successful',data:users});
    }
    catch(err){
        // Return error in case of failures
        res.status(404).json({success:false, message:'Not Found'});
    }
};
