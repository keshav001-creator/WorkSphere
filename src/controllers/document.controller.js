const docModel = require("../models/doc.model")
const workspaceModel = require("../models/workspace.model")
const wsUserModel = require("../models/wsUser.model")

async function createDoc(req, res) {

    try {
        const { title, content } = req.body
        const { workspaceId } = req.params
        const userId = req.user.id

        const doc = await docModel.create({
            workspaceId,
            title,
            content,
            createdBy: userId
        })

        return res.status(201).json({
            message: "document created successfully",
            doc
        })


    } catch (err) {
        return res.status(500).json({
            message: "Error while creating document",
            error: err.message
        })
    }
}

async function docDelete(req, res) {

    try {
        const { docId, workspaceId } = req.params

        const doc = await docModel.findOneAndDelete({
            _id: docId,
            workspaceId
        })

        if (!doc) {
            return res.status(404).json({ message: "document does not exist" })
        }

        return res.status(200).json({ message: "Document deleted successfully" })
    } catch (err) {
        return res.status(500).json({
            message: "Error while deleting document",
            Error: err.message
        })
    }
}


async function updateDoc(req, res) {

    try {
        const { docId, workspaceId } = req.params


        const updatedDoc = await docModel.findOneAndUpdate({
            _id: docId,
            workspaceId
        }, req.body, { new: true })

        if (!updatedDoc) {
            return res.status(404).json({ message: "Document does not exist" })
        }

        return res.status(200).json({
            message: "Document updated successfully",
            updatedDoc
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error while updating document",
            error: err.message
        })
    }
}


async function getDocs(req, res) {

    try {
        const { workspaceId } = req.params

        const workspace = await workspaceModel.findById(workspaceId)

        if (!workspace) {
            return res.status(404).json({ message: "Workspace Id not found" })
        }

        const docs = await docModel.find({workspaceId})

        if (docs.length === 0) {
            return res.status(404).json({ message: "docs not found" })
        }

        return res.status(200).json({
            message: "Documents fetched successfully",
            docs
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error while fetching Documents",
            error: err.message
        })
    }

}

module.exports = { createDoc, docDelete, updateDoc, getDocs }