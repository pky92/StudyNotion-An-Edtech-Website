const nodemailer=require('nodemailer');
require('dotenv').config();

const sendMail=async (email,body,title)=>{

    try{

        //create transporter

        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS,
            }
        })

        let info=await transporter.sendMail({
            from:`StudyNotion || By Pankaj`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        console.log(info)
        return info;

    }catch(err){
        console.log(err.message);
    }

}

module.exports=sendMail;