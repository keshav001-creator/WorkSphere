const taskModel = require("../models/task.model")
const docModel = require("../models/doc.model")
const inviteModel = require("../models/invite.model")
const workspaceModel = require("../models/workspace.model")
const wsUserModel = require("../models/wsUser.model")




async function wcCreate(req, res) {

    try {
        const { name } = req.body
        userId = req.user.id

        const workspace = await workspaceModel.create({
            name,
            ownerId: userId
        })

        const wsUser = await wsUserModel.create({
            workspaceId: workspace._id,
            userId,
            role: "Owner"
        })

        return res.status(201).json({
            message: "workspace created successfully",
            workspace,
            wsUser
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error while creating workspace",
            error: err.message
        })
    }

}


async function getMyWorkspaces(req, res) {

    try {
        const userId = req.user.id

        const workspaces = await wsUserModel.find({
            userId
        }).populate("workspaceId")

        if (!workspaces) {
            return res.status(404).json({ message: "no workspace found" })
        }

        return res.status(200).json({
            message: "Workspaces fetched successfully",
            workspaces
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error while fetching workspace",
            error: err.message
        })
    }
}


async function deleteWorkspace(req, res) {

    try {
        const { workspaceId } = req.params

        const workspace = await workspaceModel.findById({
            workspaceId
        })

        if (!workspace) {
            return res.status(400).json({ message: "Workspace does not exists" })
        }

        await Promise.all([
            wsUserModel.deleteMany({ workspaceId }),
            taskModel.deleteMany({ workspaceId }),
            docModel.deleteMany({ workspaceId }),
            inviteModel.deleteMany({ workspaceId })
        ])

        await workspaceModel.findByIdAndDelete(workspaceId)

        return res.status(200).json({ message: "Workspace deleted successfully" })
    } catch (err) {
        return res.status(500).json({
            message: "Error while deleting the workspace",
            error: err.message
        })
    }




}


module.exports = { wcCreate, getMyWorkspaces, deleteWorkspace }