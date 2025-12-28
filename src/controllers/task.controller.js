const taskModel = require("../models/task.model")
const wsUserModel = require("../models/wsUser.model")

async function taskCreate(req, res) {

    try {
        const { title, description, status } = req.body
        const { workspaceId } = req.params
        const userId = req.user.id

        const member = await wsUserModel.findOne({
            workspaceId,
            userId
        })

        if (!member) {
            return res.status(403).json({ message: "Not member of this workspace" })
        }

        const task = await taskModel.create({
            title,
            description,
            status,
            workspaceId,
            createdBy: userId
        })

        return res.status(201).json({
            message: "Task created successfully",
            task
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error while creating task",
            error: err.message
        })
    }
}


module.exports={taskCreate}