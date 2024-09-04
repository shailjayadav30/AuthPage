const { signup } = require("../controllers/authcontroller");
const { login } = require("../controllers/authcontroller");

const {signupvalidation, loginvalidation} =require("..//middlewares/Authvalidation")
const router=require("express").Router()
router.post("/login",loginvalidation,login)
router.post("/signup",signupvalidation,signup)

module.exports=router;