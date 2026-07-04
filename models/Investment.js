const mongoose=require("mongoose");



const investmentSchema =
new mongoose.Schema({



userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},



amount:Number,



plan:String,



startDate:Date,



endDate:Date,



dailyROI:Number,



status:{
type:String,
default:"Active"
}



},
{
timestamps:true
});



module.exports =
mongoose.model(
"Investment",
investmentSchema
);