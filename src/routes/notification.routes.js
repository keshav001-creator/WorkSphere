const express=require("express")
const {authUser}=require("../middlewares/auth.middleware")
const getNotifications=require("../controllers/notification.controller")
const router=express.Router()

router.get("/notifications",authUser,getNotifications)

module.exports=router