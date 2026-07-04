const Investment =
require("../models/Investment");


const User =
require("../models/User");


const ROIHistory =
require("../models/ROIHistory");



const calculateROI = async()=>{


const investments =
await Investment.find({

status:"Active"

});



for(let item of investments){



const roiAmount =
(item.amount * item.dailyROI)/100;




await ROIHistory.create({

userId:item.userId,

investmentId:item._id,

amount:roiAmount,

status:"Completed"

});




await User.findByIdAndUpdate(

item.userId,

{

$inc:{

walletBalance:roiAmount,

totalROI:roiAmount

}

}

);



}



console.log("ROI Updated");



}



module.exports=calculateROI;