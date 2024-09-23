const mongoose=require('mongoose')
const {sendMail}=require('../utils/mailSender')
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otpvalue:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

async function sendVerificationMail(email,otp){
    try{

        const response=sendMail(email,"otp for email verifiaction",otp)
        console.log("email sent succesfully",response);

    }
    catch(err){
        console.log("error while sending verification email ,",err);
        throw err;
    }

}


otpSchema.pre("save", async function(next){
    await sendVerificationMail(this.email,this.otp);
    next();

} )
module.exports=mongoose.model("OTP",otpSchema);















module.exports=mongoose.model("OTP",ratingAndReviewSchema);