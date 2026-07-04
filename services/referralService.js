const User=require("../models/User");

const ReferralIncome =
require("../models/ReferralIncome");



const calculateReferralIncome =
async(userId,amount)=>{


const user =
await User.findById(userId);



if(!user.referredBy)

return;




const income =
amount * 0.10;



await ReferralIncome.create({

receiver:user.referredBy,

generatedBy:userId,

level:1,

amount:income

});



await User.findByIdAndUpdate(

user.referredBy,

{

$inc:{

totalLevelIncome:income,

walletBalance:income

}

}

);



}



module.exports =
calculateReferralIncome;