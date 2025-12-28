const express=require("express")
const controller=require("../controllers/invite.controller")
const {authUser}=require("../middlewares/auth.middleware")


const router=express.Router()


router.post("/workspaces/:workspaceId/invite",authUser,controller.sendInvite)
router.post("/invite/accept/:token",authUser,controller.acceptInvite)


module.exports=router