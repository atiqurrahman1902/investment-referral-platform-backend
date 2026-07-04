const Investment=require("../models/Investment");

const User=require("../models/User");



exports.dashboard = async(req,res)=>{


try{


const user =
await User.findById(req.user);



const investments =
await Investment.find({

userId:req.user

});



const totalInvestment =
investments.reduce(

(sum,item)=>sum+item.amount,

0

);



res.json({

name:user.name,


totalInvestment,


walletBalance:user.walletBalance,


totalROI:user.totalROI,


levelIncome:user.totalLevelIncome



});



}

catch(error){


res.status(500).json({

message:error.message

});


}


}