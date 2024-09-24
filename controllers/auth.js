//send otp
 const User=require('../models/user')
 const OTP=require('../models/OTP')
 const bcrypt=require('bcrypt')
 const Profile=require('../models/profile')
 const otpGenerator=require('otp-generator')
 const JWT=require('jsonwebtoken')
const user = require('../models/user')
 require('dotenv').config()


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

    //generate otp ---BAD way as we are checking everytime for uniqye otp in our db other way..?can we use random fxn..?


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

    try{
        
    //data fetch kro 
    const {
        firstName,
        lastName,
        password,
        email,
        accountType,
        confirmPassword,
        otp,

          }=req.body;
    //validate kro data  -> if any  one of necessary data is missing then return an message "fill all the necessaary fields"

    if(!firstName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All fields are required."
        })
    }
    
    //match both pass and confirm pass
    if(password !=confirmPassword){
        return res.status(400).json({
            success:false,
            message:"password and confirm password does not Match."

        })
    }
    //already user exist 
    const existUser=User.findOne({email});
    if(existUser){
        return res.status(400).josn({
            success:false,
            message:"user already exist "
        })
    }
    //find the latest otp store in db
    const latestOTP=OTP.findOne({email}).sort({createdAt:-1}).limit(1);
    console.log(latestOTP);              

    //validate otp
    if(latestOTP.length ==0){
        return res.status(400).json({
            success:false,
            message:"OTP Not Found."
        })

    }
    if(otp!=latestOTP.otp){
        return res.status(400).json({
            success:false,
            message:"Invalid Otp."
        })
    }
    //Hash Passwors
    let hashPassword=await bcrypt.hash(password,10);

    //create entry in database -> we can put hashPassword for password but for additional details we need to create profile also
    
    const profileDetails= await Profile.create({
        gender:null,
        dateOfBirth:null,
        contactNumber:null,
        about:null,
        profession:null,

    })

    const updatedUser= await User.create({
        email,
        firstName,
        lastName,
        accountType,
        password:hashPassword,
        additionalDetails: profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })


    // return res

    res.status(200).json({
        success:true,
        message:"user registered successfully.",
        updatedUser,

    })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:`error while Sigining up ,${err}`
        })
    }
 }

 //login

 exports.login=async (req,res)=>{
    try{
        
        //fetch data
        const {email,password}=req.body;

        //data validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                messsge:"Fill all the * fields."
            })
        }

        //check if user not registered yet
        const user=await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not registered Please Sign Up first"
            })
        }

        //generate JWT token after password matching 

        if(await bcrypt.compare(password,user.password)){
            //if matches create a jwt token
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token=JWT.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })

            user.token=token;
            //hide the password
            user.password=undefined;


            //send a cookie
            const options={
                expires: new Date(Date.now() +3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged IN suucessfully",
            })
        }

        else{
            return res.status(401).json({
                success:false,
                message:"Passwrod Incorrect"
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).josn({
            success:false,
            message:"Not able to Login A this moment."
        })
    }
 }

 //change password
 

 exports.changePassword=async (req,res)=>{
    try{
        //get data ->old ,new and confirm pass
        //validate
        //update in db
        //send mail
        //resturn response

    }catch(err){
        console.log(err);
        return res.status(500).josn({
            success:false,
            message:"Reset Passwrod cant be done at this moment."
        })
    }
 }