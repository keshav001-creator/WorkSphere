const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

async function registerUser(req,res){

   try{
     const {email,fullName:{firstName,lastName},password}=req.body

    const isUserExist=await userModel.findOne({
        email
    })

    if(isUserExist){
        return res.status(409).json({
            message:"User already exist"
        })
    }

    

    const hashedPass=await bcrypt.hash(password,10)

     const User=await userModel.create({
        email,
        fullName:{
            firstName,
            lastName
        },
        password:hashedPass
       
    })

    const token=jwt.sign({
        id:User._id,
        email:User.email
    },process.env.JWT_SECRET_KEY,{expiresIn:"1d"})


    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:20*60*60*1000
    })

    res.status(201).json({
        message:"User registered successfully",
        User
    })

}catch(err){
    res.status(500).json({
        message:"Error while registering User",
        Error:err.message
    })
}
    
}

async function loginUser(req,res){

   try{
     const{email,password}=req.body

    const User=await userModel.findOne({
        email
    }).select("+password")

    if(!User){
        return res.status(400).json({
            message:"User is not registred"
        })
    }

    const isMatch=await bcrypt.compare(password,User.password)

    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Password "
        })
    }

     const token=jwt.sign({
        id:User._id,
        email:User.email
    },process.env.JWT_SECRET_KEY,{expiresIn:"1d"})


    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:20*60*60*1000
    })

    return res.status(200).json({
        message:"User logged in successfully",
        User
    })

}catch(err){
    return res.status(500).json({
        message:"Failed to Login",
        error:err.message
    })
}
}


module.exports={registerUser,loginUser}