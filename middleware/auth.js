const jwt=require('jsonwebtoken')
const User=require('../models/user')

require('dotenv').config()

exports.auth=async (req,res,next)=>{
    try{

        //extract tokken

        const  token= req.cookies.token || req.body.token
                       || req.header("Authrisation").replace("Bearer","")
        
        //if token not found 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }

        //verify token

        try{
            const decode=  jwt.verify(token,process.env.JWT_SECRET)
            console.log("decoded token ",decode);

            req.user=decode;

        }
        catch(err){
            console.log("error while token verifying ")

            return res.status(401).json({
                success:fasle,
                message:"token not verified.  Invalid token"
            })
        }
next();
    }catch(err){
        console.log(err);

        res.status(500).json({
            success:false,
            message:`got error while authentication,${err.message}`
        })
    }
}


//isStudent

exports.isStudent= async (req,res,next)=>{

    try{
        if(req.user.accoutType!="Student"){
            return res.status(401).json({
                success:false,
                message:"protected route for student only."
            })
        }

    }
    catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"An error occurred while checking role of user"
        })
    }
}

//isTutor

exports.isTutor= async (req,res,next)=>{

    try{
        if(req.user.accoutType!="Tutor"){
            return res.status(401).json({
                success:false,
                message:"protected route for Tutor only."
            })
        }

    }
    catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"An error occurred while checking role of user"
        })
    }
}

//isAdmin


exports.isAdmin= async (req,res,next)=>{

    try{
        if(req.user.accoutType!="Admin"){
            return res.status(401).json({
                success:false,
                message:"protected route for Admin only."
            })
        }

    }
    catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"An error occurred while checking role of user"
        })
    }
}


