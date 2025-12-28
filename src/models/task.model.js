const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({

    workspaceId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:["Todo","In_Progress","Done"],
        default:"Todo",
        required:true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }

},{
    timestamps:true
})

const taskModel=mongoose.model("task",taskSchema)

module.exports=taskModel