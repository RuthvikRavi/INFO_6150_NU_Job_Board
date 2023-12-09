import User from '../models/User.js' 

//create new Admin
export const createAdmin = async (req,res) => {
    const newUser = new User(req.body)

    try{
        const savedUser = await newUser.save()

        res.status(200).json({success:true, message:'Successfully created',data:savedUser});
    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to create'});

    }
};

//makeAdmin
export const makeAdmin = async (req,res) => {
    const id = req.params.id;
    try{
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message:'Successfully updated',data:updatedUser});

    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to update'});

    }
};