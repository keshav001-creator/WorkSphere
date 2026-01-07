const express=require("express")
const controller=require("../controllers/ws.controller")
const {authUser}=require("../middlewares/auth.middleware")
const rbac=require("../middlewares/rbac.middleware")

const router=express.Router()


router.get("/workspaces",authUser,controller.getMyWorkspaces)


router.post("/workspace",authUser,controller.wcCreate)
router.delete("/workspaces/:workspaceId",authUser,rbac(["Owner"]),controller.deleteWorkspace)
// router.patch("/workspaces/:workspaceId",authUser,rbac(["Admin","Owner"]),controller.updateName)
router.get("/workspaces/:workspaceId",authUser,controller.getWs)

// activity logs
router.get("/workspace/:workspaceId/activityLog",rbac(["Admin","Owner","Member"]),controller.getActivityLogs)




module.exports=router