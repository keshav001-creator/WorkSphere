const express=require("express")
const validator=require("../middlewares/validator.middleware")
const controller=require("../controllers/user.controller")
const router=express.Router()


router.post("/register",validator.registerUserValidator,controller.registerUser)
router.post("/login",validator.loginUserValidator,controller.loginUser)
router.post("/logout",controller.logoutUser)
router.get("/getme",controller.getme)

module.exports=router