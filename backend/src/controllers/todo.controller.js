// // without services

// const Todo= require("../models/Todo.model");

// //GET ALL TODOS
// const getTodos= async (req, res)=> {
//     try {
//         const userId= req.user.userId; //get logged in users id from token

//         const todo= await Todo.find({userId}); //find all todos for this user

//         res.status(200).json({
//             success: true,
//             message: "Todos fetched successfully",
//             data: todos,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false, 
//             message: error.message,
//         })
//     }
// };


// //CREATE TODO
// const createTodo= async (req, res)=>{
//     try {
//         const userId= req.user.userId; //get logged in users id
//         const {title}= req.body; //get title from the req body

//         const todo= await Todo.create({
//             title,
//             userId,
//             completed: false, // new todo always starts as not completed
//         });

//         res.status(201).json({
//             success: true, 
//             message: "Todo created successfully",
//             datat: todo,
//         })
//     } catch (error) {
//         res.status(400).json({
//             sucess: false,
//             message: error.message
//         })
        
//     }
// };


// //UPDATE TODO
// const updateTodo= async( req, res)=>{
//     try {
//         const userId= req.user.userId; //get logged in users id
//         const [id]= req.params; //get todo id from url
//         const {title, completed}= req.body; //get update data

//         const todo= await Todo.findOneAndUpdate(
//             {_id: id, userId}, //find todo matching both id and userId
//             {title, completed}, //update  these fields
//             {new:true} //return updted todo
//         )

//         if(!todo){
//             return res.status(404).json({
//                 success: false,
//                 message: "todo not found"
//             })
//         }

//         res.status(200).json({
//                 success: true,
//                 message: "Todo updated succcessfully",
//                 data: todo
//             })
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }

// //DELETE TODO
// const deleteTodo= async (req, res)=>{
//     try {
//         const userId= req.user.uerId; //get logged in users id
//     const {id} = req.params; //get todo id from url

//     const todo= await Todo.findOneAndDelete({_id:id, userId});

//     if(!todo){
//         return res.status(404).json({
//             success: false,
//             message: "Todo is not found",
//         })
//     }
    
//     res.status(200).json({
//         success: true,
//         message: "Todo is deleted successfully",
//         data: todo
//     })
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         })
        
//     }
    
// }



//With Service
const {SgetTodos, ScreateTodo, SUpdateTodo, SdeleteTodo}= require ("../services/todo.service");

// GET ALL TODOS
const getTodos= async(req, res)=>{
    try {
        const userId= req.user.userId;

        const todos= await SgetTodos(userId);

        res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data: todos,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });   
    };
};

// CREATE TODO
const createTodo= async( req, res)=>{
    try {
        const userId= req.user.userId;
        const {title}= req.body;

        const todo= await ScreateTodo({userId, title});

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo
        })
    } catch (error) {
        res.status(400).json99({
            success: false,
            message: error.message
        })  
    }
}

// UPDATE TODO
const updateTodo= async (req, res)=>{
    try {
        const userId= req.user.userId;
        const id= req.params.id;

        const {title, completed} = req.body;

        const todo= await SUpdateTodo({userId, id, title, completed})

        res.status(201).json({
            success: true,
            message: "Todo Updated successfully",
            data: todo
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    };
};

//DELETE TODO
const deleteTodo= async (req, res)=>{
    try {
        const userId= req.user.userId;
        const id= req.params.id;
       await SdeleteTodo({userId, id});

        res.status(201).json({
            success: true,
            message: "Todo delete successfully",
            data: todo
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    };
};

module.export= {getTodos, createTodo, updateTodo, deleteTodo}


