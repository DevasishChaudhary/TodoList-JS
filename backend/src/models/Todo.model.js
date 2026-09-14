const mongoose= require("mongoose");

//SCHEMA-blueprint/template for MongoDB
const TodoSchema= new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        completed:{
            type: Boolean,
            default: false, //new todos always start as not completed
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId, // reference to User
            ref: "User",   //points to User collection
            required: true,
        },
    },
    {
        timestamps:true,
    }
);

module.exports= mongoose.model("Todo", TodoSchema); //exports Todo model