const Investment = require("../models/Investment");

const referralService =
require("../services/referralService");




// Create Investment

exports.createInvestment = async(req,res)=>{


try{


const {

amount,

plan,

dailyROI

}=req.body;



const investment =
await Investment.create({

userId:req.user,

amount,

plan,

dailyROI,

startDate:new Date(),

status:"Active"

});




// referral income calculation

await referralService(

req.user,

amount

);



res.json({

message:"Investment created successfully",

investment

});



}


catch(error){


res.status(500).json({

message:error.message

});


}


}




// Get investment


exports.getMyInvestment =
async(req,res)=>{


try{


const investments =

await Investment.find({

userId:req.user

});



res.json(investments);


}


catch(error){


res.status(500).json({

message:error.message

});


}



}