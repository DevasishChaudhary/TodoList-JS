const jwt = require("jsonwebtoken");

const protects= (req, res, next)=>{
    try {
        //1. get token from the request header
        const authHeader= req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        //2. extract token (remove "Bearer" part)
        const token= authHeader.split(" ")[1];

        //3. verify token using the secret key
        const jwtSecret= process.env.JWT_SECRET;
        const decoded= jwt.verify(token, jwtSecret);

        //4. attach user infor to request object
        req.user= decoded;

        //5. move to next step
        next();
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        }) ;
    }
};

module.exports= {protects}; //exports protect middleware