import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

// Function to register a new user
export const register = async(req,res) => {
    
    try{        
        // Hash the password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        // Create a new user document
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })

        // Try to save the new user
        await newUser.save()

        // Return 200OK in case of successful creation
        res.status(200).json({success:true, message:'Successfully created'});
    }catch(err) {
        // Return error in case of any failures
        res.status(500).json({success:true, message:'Failed to create. Try again'});
    }
};

// Function for logging in the user
export const login = async(req,res) => {

    // Get the user email from request body
    const email = req.body.email

    try{   
        // Check if user by that email exists
        const user = await User.findOne({email})

        // If user does not exist, return error
        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }

        // If user exists, check if password is correct
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        // If password is incorrect, return error
        if(!checkCorrectPassword){
            return res.status(401).json({success:false, message:'Incorrect email or password'})
        }

        // Fetch all required values
        const {password, role, ...rest} = user._doc

        // Create a new JWT token
        const token = jwt.sign(
            {id:user._id, role:user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d"}
        );

        // Set token in the browser's cookies and send the response
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires:token.expiresIn
        })
        .status(200)
        .json({
            token,
            data:{role:role, ...rest},
            role,
        });

    }catch(err) {
        // Return errors in case of failures
        res.status(500).json({success:false, message:'Failed to login'})
    }
};
