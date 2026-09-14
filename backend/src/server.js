require("dotenv").config(); //loads .env file

const app= require("./app"); //import Express app
const connectDB= require("./config/db");

const PORT= process.env.PORT || 5000;

//connect to database first
connextDB();

//start sevrer
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
