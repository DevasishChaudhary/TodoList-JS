const Todo= require ("../models/Todo.model");
const jwt= require ("jsonwebtoken");

//GET ALL TODOS
const SgetTodos= async(userId)=>{
    //check the userId from the Todo collection database
    const todos= await Todo.find(userId);
    return todos;
}

//CREATE TODO
const ScreateTodo= async (title, userId)=>{
    const {title, userId}= data;
    
    const todo= await Todo.create({
        title, userId, completed: false,
    });
    return todo;
}

//UPDATE TODO
const SupdateTodo= async (id, userId, title, completed)=>{
    const {userId, id, title, completed}= data;

    const todo= await Todo.findOneAndUpdate(
        {_id:id, userId}, 
        {title, completed},
        {new:true}
    );

    if(!todo){
        throw new Error("Todo not found");
    }
    return todo;
};

//DELETE TODO
const SdeleteTodo= async (id, userId)=>{
    const todo= await Todo.findOneAndDelete({_id:id, userId});

    if (!todo){
        throw new  Error("Todo not found")
    }
    return todo;
};

module.export= { SgetTodos, ScreateTodo, SupdateTodo, SdeleteTodo};
