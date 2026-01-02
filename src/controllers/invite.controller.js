const wsUserModel = require("../models/wsUser.model")
const inviteModel = require("../models/invite.model")
const crypto = require("crypto")
const Notification = require("../models/notification")
const userModel = require("../models/user.model")


async function sendInvite(req, res) {

    try {
        const { email, role } = req.body
        const { workspaceId } = req.params


        const token = crypto.randomBytes(32).toString("hex")

        await inviteModel.create({
            workspaceId,
            email,
            role,
            token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })

        const invitedUser = await userModel.findOne({ email })

        if (invitedUser) {
            await Notification.create({
                userId: invitedUser._id,
                type: "Invite",
                message: "You have been invited to join the workspace",
                token
            })

            const io = req.app.get("io")
            io.to(invitedUser._id.toString()).emit("notification", {
                type: "Invite",
                message: "you have been invited to join the workspace",
                token
            })
        }



        return res.status(201).json({
            message: "Invite sent",
            inviteLink: `invite/accept/${token}`
        })


    } catch (err) {
        return res.status(500).json({
            message: "Error while sending invite",
            error: err.message
        })
    }



}


async function acceptInvite(req, res) {

    try {

        const { token } = req.params
        const userEmail = req.user.email
        const userId = req.user.id

        const invite = await inviteModel.findOne({
            token,
            used: false,
            expiresAt: { $gt: new Date() }
        })


        if (!invite) {
            await Notification.updateMany({ token }, { isRead: true });
            return res.status(400).json({ message: "Invalid or expired token" })
        }

        if (invite.email !== userEmail) {
            return res.status(403).json({ message: "Invitation is not for you" })
        }


        const exists = await wsUserModel.findOne({
            workspaceId: invite.workspaceId,
            userId
        })

        if (exists) {
            exists.role = invite.role
            await exists.save()

            invite.used = true
            await invite.save()

            return res.status(200).json({ message: "Workspace role update successfully" })
        }

        const wsUser = await wsUserModel.create({
            userId,
            workspaceId: invite.workspaceId,
            role: invite.role
        })

        invite.used = true

        await invite.save()

        await Notification.updateMany({ token }, { isRead: true });

        return res.status(201).json({
            message: "Invitation accepted successfully",
            wsUser
        })



    } catch (err) {

        return res.status(500).json({
            message: "Error while accepting invitation",
            error: err.message
        })
    }
}

module.exports = { sendInvite, acceptInvite }