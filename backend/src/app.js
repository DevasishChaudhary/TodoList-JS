const express= require("express"); // imports express
const cors= require("cors") // allows frontend to talk to backend

const app= express(); //creates Express application

//MIDDLEWARE
//runs on every request before reaching routes
app.use(cors()); //allow frontend communication
app.use(express.json()); //allow reading JSON from request body

//TEST ROUTE
// app.get("/", (req, res)=>{
//     res.json({message: "API is running..."}); //confirms server is working
// })

//ROUTES
app.use("/api/auth", authRoutes); //all auth routes -> /api/auth
app.use("/api/todos", todoRoutes); // all todo routes-> /api/todos

module.exports= app;  //exports app on server.js can use it


