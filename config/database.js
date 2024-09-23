const mongoose=require('mongoose')
require('dotenv').config();

exports.dbConnect=()=>{

    const dbUrl=process.env.DB_URL

    mongoose.connect(dbUrl,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(()=>
        console.log("Dartabase connected Successfully!!")

    ).catch((err)=>{
        console.error(err);
        console.log("Error While establashing Connection with DB. ")
        
    })
}