const mongoose=require('mongoose')


const ratingAndReviewSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("Rating",ratingAndReviewSchema);
