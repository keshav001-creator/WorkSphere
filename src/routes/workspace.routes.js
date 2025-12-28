const express=require("express")
const controller=require("../controllers/ws.controller")
const {authUser}=require("../middlewares/auth.middleware")
const rbac=require("../middlewares/rbac.middleware")

const router=express.Router()




router.post("/workspace",authUser,controller.wcCreate)
router.get("/workspaces",authUser,controller.getMyWorkspaces)
router.delete("/workspaces/:workspaceId",authUser,rbac(["Owner"]),controller.deleteWorkspace)


module.exports=router