const express= require("express");
const router= express.Router(); //create mini router
const { signup, login } = require("../controllers/auth.controller"); //import control

//map URLs to controllers
router.post("/signup", signup); //POST /api/auth/signup
router.post("/login", login); //POST /api/auth/login

module.exports= router; //exports router