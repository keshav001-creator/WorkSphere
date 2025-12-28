const express=require("express")
const controller=require("../controllers/task.controller")
const {authUser}=require("../middlewares/auth.middleware")


const router=express.Router()


router.post("/workspace/:workspaceId/tasks",authUser,controller.taskCreate)


module.exports=router