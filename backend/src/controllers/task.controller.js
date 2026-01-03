const taskModel = require("../models/task.model")
const workspaceModel = require("../models/workspace.model")
const wsUserModel = require("../models/wsUser.model")
const logModel=require("../models/activitylog")

async function taskCreate(req, res) {

    try {
        const { title, description, status } = req.body
        const { workspaceId } = req.params
        const userId = req.user._id


        const task = await taskModel.create({
            title,
            description,
            status,
            workspaceId,
            createdBy: userId
        })

        await logModel.create({
            workspaceId,
            actor: req.user._id,
            message: `Task created by ${req.user.fullName.firstName} ${req.user.fullName.lastName}`
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


async function deleteTask(req, res) {

    try {
        const { workspaceId, taskId } = req.params

        const workspace = await workspaceModel.findById(workspaceId)

        if (!workspace) {
            return res.status(400).json({ message: "WorkspaceId is not there" })
        }

        const task = await taskModel.findOneAndDelete({
            _id: taskId,
            workspaceId
        })

        if (!task) {
            return res.status(404).json({ message: "Task does not exist" })
        }

        await logModel.create({
            workspaceId,
            actor: req.user._id,
            message: `Task deleted by ${req.user.fullName.firstName} ${req.user.fullName.lastName}`
        })

        return res.status(200).json({ message: "Task deleted successfully" })

    } catch (err) {
        return res.status(500).json({
            message: "Error while deleting task",
            error: err.message
        })
    }

}


async function updateTask(req, res) {

    try {
        const { title, description, status } = req.body
        const { workspaceId, taskId } = req.params

        const workspace = await workspaceModel.findById(workspaceId)

        if (!workspace) {
            return res.status(400).json({ message: "WorkspaceId is not there" })
        }


        const updatedTask = await taskModel.findOneAndUpdate({
            _id: taskId,
            workspaceId
        }, req.body, { new: true })

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" })
        }

        await logModel.create({
            workspaceId,
            actor: req.user._id,
            message: `Task updated by ${req.user.fullName.firstName} ${req.user.fullName.lastName}`
        })

        return res.status(200).json({
            message: "Task update successfully",
            updatedTask
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error while updating task",
            error: err.task
        })
    }
}

async function getTask(req, res) {
    try {
        const { workspaceId, taskId } = req.params

        const workspace = await workspaceModel.findById(workspaceId)

        if (!workspace) {
            return res.status(400).json({ message: "WorkspaceId is not there" })
        }

        const task = await taskModel.findOne({
            workspaceId,
            _id: taskId
        })

        if (task.length === 0) {
            return res.status(404).json("Task not found")
        }

        return res.status(200).json({
            message: "Task fetched successfull",
            task
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error while getting task",
            error: err.message
        })
    }
}



async function fetchTasks(req, res) {

    try {
        const { workspaceId } = req.params

        const workspace = await workspaceModel.findById(workspaceId)

        if (!workspace) {
            return res.status(400).json({ message: "WorkspaceId is not there" })
        }

        const tasks = await taskModel.find({
            workspaceId
        })

        if (tasks.length === 0) {
            return res.status(404).json({ message: "Tasks not found" })
        }

        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error while fetching tasks",
            error: err.message
        })
    }

}


module.exports = { taskCreate, deleteTask, updateTask, getTask, fetchTasks }