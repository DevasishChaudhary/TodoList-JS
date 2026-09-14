const express= require("express");
const router=  express.Router();
const { protect } = require("../middleware/auth.middleware"); //aut middleware
const { getTodos, createTodo, updateTodo, deleteTodo} = require("../controllers/todo.controller"); //import controller

//all doto routes are protected (require login)
router.get("/", protect, getTodos); //GET /api/todos
router.get("/", protect, createTodo); //GET /api/todos
router.put("/:id", protect, updateTodo); //PUT /api/todos/:id
router.delete("/:id", deleteTodo); //DELETE /api/todos/:id

module.exports= router;
