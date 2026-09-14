//without services
const jwt= require("jsonwebtoken");
const User= require("../models/User.models");

//SIGNUP CONTROLLER
const signup= async (req, res)=> {
    try {
        const {name, email, password}= req.body;

        //1.check if the user already exist
        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already exist"
            });
        }

        //2. create user (password hased by pre-save hook)
        const user= await User.create({name, email, password});

        //3. generate token
        const token=jwt.sign(
            {userId:user._id, email:user.email}, process.env.JWT_SECRET,{expiresIn:"7d"}
        );

        //4.send response
        res.status(200).json({
            success: true,
            message: "Account created successfully",
            data:{
                token,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//LOGIN CONTROLLER
const login= async(req, res)=>{
    try {
        const {email, password}= req.body;

        //1.find the user by email
        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: falsee,
                message: "Invalid email or password",
            });
        }

        //2. compare password
        const isMatch= await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        //3. generate token
        const token= jwt.sign(
            {userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "7d"}
        );

        //send response
        res.status(200).json({
            success: true,
            message: "Login Successful",
            data:{
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
        }) ;
    }
};

module.exports= {signup, login}