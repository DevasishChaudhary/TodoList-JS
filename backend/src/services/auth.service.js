const jwt= require("jsonwebtoken");
const User= require("../models/User.models");

//Helper Function- generate JWT token
const generateToken= (userId, email) =>{
    const token= jwt.sign(
        {userId, email},
        process.env.JWT_SECRET,
        { expiresIn: "7d"}
    );
    return token;
};

//SIGNUP SERVICE
const Ssignup= async (name, email, password) =>{
    //1. check if the user already exist
    const existingUser= await User.findOne({email});
    if(existingUser){
        throw new error("Email already registered");
    }

    //2. create user (password hashed by pre-save hook)
    const user= await User.create({name, email, password});

    //3. generate token
    const token= generateToken(user._id, user.email);

    //4. return token+ user
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

//LOGIN SERVICE
const Slogin= async (email, password)=>{
    // 1. find the user by email
    const user= await User.findOne({email});

    if (!user){
        throw new error("Invalid email and password");
    }

    //2. compare password
    const isMatch= await user.comparePassword(password);
    if (!isMatch) {
        throw new error("Invalid email or password");
    }

    //3. generate token 
    const token= generateToken(user._id, user.email);

    //4. return token + user
    return {
        token, 
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

module.exports= { Ssignup, Slogin};