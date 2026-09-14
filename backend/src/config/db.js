const mogooose= require("mongoose"); //mongoose to connect MongoDB

const connectDB= async ()=>{
    try {
        const mongoURI= process.env.MONGO_URI; //reads MongoDB URL from .env

        if(!mongoURI){
            throw new Error ("MONGODB_URI is not defined"); //stops if missing
        }

        await mongoose.connect(mongoURI); //connect to MongoDB
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB connection failed", error)
        process.exist(1); //kills sevrer if database connection fails
    }
};

module.exports= connectDB; //exports so server.js can use it