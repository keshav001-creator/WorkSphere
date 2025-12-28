const wsUserModel = require("../models/wsUser.model")
const inviteModel = require("../models/invite.model")
const crypto = require("crypto")


async function sendInvite(req, res) {

    try {
        const { email, role } = req.body
        const userId = req.user.id
        const { workspaceId } = req.params

        const member = await wsUserModel.findOne({
            userId,
            workspaceId
        })

        if (!member || !["Owner", "Admin"].includes(member.role)) {
            return res.status(403).json({ message: "Not allowed" })
        }

        const token = crypto.randomBytes(32).toString("hex")

        const invite = await inviteModel.create({
            workspaceId,
            email,
            role,
            token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })


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


async function acceptInvite(req,res){

    try{

        const {token}=req.params
        const userEmail=req.user.email
        const userId=req.user.id

        const invite=await inviteModel.findOne({
            token,
            used:false,
            expiresAt:{$gt:new Date()}
        })

        if(!invite){
            return res.status(400).json({message:"Invalid or expired token"})
        }

        if(invite.email !== userEmail){
            return res.status(403).json({message:"Invitation is not for you"})
        }


        const exists=await wsUserModel.findOne({
            workspaceId:invite.workspaceId,
            userId
        })

        if(exists){
           exists.role=invite.role
           await exists.save()

           invite.used=true
           await invite.save()

           return res.status(200).json({message:"Workspace role update successfully"})
        }

        const wsUser=await wsUserModel.create({
            userId,
            workspaceId:invite.workspaceId,
            role:invite.role
        })

        invite.used=true

        await invite.save()

        return res.status(201).json({
            message:"Invitation accepted successfully",
            wsUser
        })



    }catch(err){

        return res.status(500).json({
            message:"Error while accepting invitation",
            error:err.message
        })
    }
}

module.exports={sendInvite,acceptInvite}