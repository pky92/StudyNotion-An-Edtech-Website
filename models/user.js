const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,   
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Student","Tutor","Admin"],     
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.ObjectId,
        ref:"Profile",
        required:true,
    },
    courses:[{
        type:mongoose.Schema.ObjectId,
        ref:"Course",

    }],
    image:{
        type:String,
        required:true,
    },
    courseProgress:[{
        type:mongoose.Schema.ObjectId,
        ref:"CourseProgress",
    }],
    token:{
        type:String
    },
    resetPasswordToken:{
        type:Date
    }

})

module.exports=mongoose.model('User',userSchema);