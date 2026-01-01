const notifications=require("../models/notification")


async function getNotifications(req,res){

    try{

        const {userId}=req.user.id
        const Notifications=await notifications.find({
            userId,
            isRead:false
        }).sort({createdAt:-1})

        if(!Notifications){
            return res.status(404).json({
                message:"Notifications not found"
            })
        }

        return res.status(200).json({
            message:"Notifications fetched successfully",
            Notifications
        })


    }catch(err){
        return res.status(500).json({
            message:"Error whi;e geting Notifications",
            error:err.message
        })
    }

}

module.exports=getNotifications