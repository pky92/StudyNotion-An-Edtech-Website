const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    whatWillYouLearn:{
        type:String,
    },
    price:{
        type:Number,
    },
    courseContent:[{
        type:mongoose.Schema.ObjectId,           //multiple sections are possible such as videos,notes,etc.
        ref:"Section",
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.ObjectId,                      //courese canhave multiple rating and reviews
        ref:"Rating",

    }],
    tag:{
        type:mongoose.Schema.ObjectId,
        ref:"Tag"
    },
    studentEnrolled:[{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
        
    }]

})


module.exports=mongoose.model("Course",courseSchema);