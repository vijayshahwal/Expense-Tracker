// Importing required modules
const User = require("../models/user"); // Importing User model
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation
require("dotenv").config(); // Importing dotenv to access environment variables

// Signup route handler
exports.signup = async(req,res) => {
    try{
        // Destructuring input data from request body
        const {name,email,password,role} = req.body;

        // Checking if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            // If user exists, return error response
            return res.status(400).json({
                success:false,
                message:"email already exists",
            })
        }

        // Hashing the password
        let hashedPassword 
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }catch(err){
            // If error occurs while hashing, return error response
            return res.status(500).json({
                success:false,
                message:"Error in hasing password"
            })
        }

        // Creating new user
        const newUser = await User.create({
            name,email,password: hashedPassword,role
        })

        // If user is created successfully, return success response
        return res.status(200).json({
            success:true,
            message:"Successfully registered",
        })
    }catch(err){
        // If error occurs, log the error and return error response
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Unsuccessful please try again later",
        })
    }
}

// Login route handler
exports.login = async(req,res) => {
    try {
        // Destructuring input data from request body
        const {email,password} = req.body;

        // Validating input data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill the details correctly"
            })
        }

        // Checking if user exists
        const user = await User.findOne({email});

        if(!user){
            // If user does not exist, return error response
            return res.status(401).json({
                success:false,
                message:"Not registered with us"
            })
        }

        // Creating payload for JWT
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };

        // Verifying password and generating JWT token
        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            // Adding token to user object and removing password
            user.token = token;
            user.password = undefined;

            // Setting cookie options
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000), // Cookie expiration time
                httpOnly:true,
            }

            // Setting cookie and returning success response
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"Logged in successfully",
                token,
                user: {
                    ...user._doc, // _doc contains the document's properties
                    token,
                    password: undefined // to not send the password
                },
            })

        }else{
            // If password is incorrect, return error response
            return res.status(403).json({
                success:false,
                message:"Password incorrect"
            })
        }

    } catch(err) {
        // If error occurs, log the error and return error response
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login Failure"
        })
    }
}