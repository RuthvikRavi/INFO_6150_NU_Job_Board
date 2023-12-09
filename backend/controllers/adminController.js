import User from '../models/User.js' 

// Create  a New Admin User
export const createAdmin = async (req,res) => {

    // Get the request body
    const newUser = new User(req.body)

    try{
        // Try saving the new admin in database
        const savedUser = await newUser.save()
        res.status(200).json({success:true, message:'Successfully created',data:savedUser});
    }
    catch(err){
        // If unable to save in database, throw error
        res.status(500).json({success:false, message:'Failed to create'});

    }
};

// Function to make any Registered User an Admin
export const makeAdmin = async (req,res) => {
    // Get the id of the registered user in request body
    const id = req.params.id;
    try{

        // Try fetching the user and setting it as an update
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        // Return 200 OK on successful update
        res.status(200).json({success:true, message:'Successfully updated',data:updatedUser});
    }
    catch(err){
        // Return error in case of update failure
        res.status(500).json({success:false, message:'Failed to update'});

    }
};