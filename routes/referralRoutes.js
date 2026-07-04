const express=require("express");


const router=express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {

getReferralIncome

}
=
require("../controllers/referralController");




router.get(

"/",

authMiddleware,

getReferralIncome

);



module.exports=router;