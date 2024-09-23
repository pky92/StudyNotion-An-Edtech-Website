//send otp
 const User=require('../models/user')
 const OTP=require('../models/OTP')
 const otpGenerator=require('otp-generator')


 exports.sendOTP=async (req,res)=>{
try{
    const {email}=req.body;
    const alreadyUser=await User.findOne({email});

    //check if already user present 
    if(alreadyUser){
        return res.status(401).json({
            success:false,
            message:"user already exist "

        })
    }

    //generate otp ---BAD way as we are checking everytime for uniqye otp other way..?random fxn..?


    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });

    console.log("generated otp :",otp)

    let isUnique= await OTP.findOne({otp:otp})    //always get forget to put await 
    
    while(isUnique){
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        isUnique= await OTP.findOne({otp:otp})
    }

    const payload={email,otp};

    const newOTP= await OTP.create(payload);
    console.log("otp body :",newOTP);

    res.send.status(200).json({
        success:true,
        message:"otp sent succesfully.",
        
    })
}
catch(err){
    console.log("unexpecting error while generating otp. ",err)
} 
 
 }


 //sign up controllers

 exports.siginUp=async (req,res)=>{
    //data fetch kro 
    const {
        firstName,
        lastName,
        password,
        confirmPassword,
        

          }=req.body;
    //validate kro data 
    //already user exist 
    //find the latest otp store in db
    //validate otp
    //Hash Passwors
    //create entry in database
    // return res
 }