const mongoose=require("mongoose");



const referralSchema =
new mongoose.Schema({



receiver:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},



generatedBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},



level:Number,



amount:Number,



date:{
type:Date,
default:Date.now
}



});



module.exports =
mongoose.model(
"ReferralIncome",
referralSchema
);