const mongoose=require("mongoose");



const roiSchema =
new mongoose.Schema({



userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},



investmentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Investment"
},



amount:Number,



date:{
type:Date,
default:Date.now
},



status:String



});



module.exports =
mongoose.model(
"ROIHistory",
roiSchema
);