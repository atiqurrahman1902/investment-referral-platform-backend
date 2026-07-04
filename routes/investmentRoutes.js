const express=require("express");


const router=express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {

createInvestment,

getMyInvestment

}
=
require("../controllers/investmentController");





router.post(

"/create",

authMiddleware,

createInvestment

);



router.get(

"/my",

authMiddleware,

getMyInvestment

);



module.exports=router;