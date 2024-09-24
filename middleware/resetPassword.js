const User =require('../models/user')
const mailSender=require('../utils/mailSender')
const bcrypt=require(bcrypt)

exports.resetPassword=async (req,res)=>{

    try{
        //fetch data 
        const {email}=req.body;
      
        //validations check if user is not there
        const user= await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user doesn't exist"
            })
        }
        //create a token ->it'll give random token
        const token = crypto.randomUUID();

        const updatedUser=await User.findOneAndUpdate({email:email},
                                                {token:token, resetPasswordToken:Date.now()+ 5*60*1000}, {new:true}
                                           )
      
        //create an url that will be send on your registered email by which you can reset your password
        const url=`http://localhost:3000/update-password/${token}`

        //now send the mail that contains this url
        await mailSender(email,"reset your password on this link ",`link : ${url}`)

        return res.status(200).json({
            success:false,
            message:"reset password link sent to your registered email."
        })


    }catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"ERROR reset passwordddd can't be done"
        })
    }
}



//reset password

exports.resetPassword=async (req,res)=>{
    try{

        //data fetch
        const {password,confirmPassword,token}=req.body;

        //validation  ->check both password mathches or not 
        if(password != confirmPassword){
            return res.status(401).json({
                success:false,
                message:"both password and confirm passwrod are different ,"
            })
        }
        
        const newuser=await User.findOne({token:token});

        if(!newuser){
            return res.status(401).json({
                success:false,
                message:"token Invalid"
            })
        }

        if(newuser.resetPasswordToken > Date.now()){
            return res.status(401).json({
                success:false,
                message:"Link expires try again !!"

            })

        }

        //hash passwords
        const hashPassword=await bcrypt.hash(password,10);

        //update the user 
        await User.findOneAndUpdate({token:token} , 
            {password:hashPassword, }, {new:true})

return res.status(200).json({
    success:true,
    message:"password updated succcessfully"
})


    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Not able to reset the password"
        })
    }
}