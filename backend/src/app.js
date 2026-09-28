const express= require("express"); // imports express
const cors= require("cors") // allows frontend to talk to backend
const authRoutes= require("./routes/auth.routes");
const todoRoutes= require("./routes/todo.routes");
const {errorHnadler}= require("./middleware/error.middleware")

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

//ERROR HANDLER- must be last
app.use(errorHandler);

module.exports= app;  //exports app on server.js can use it


