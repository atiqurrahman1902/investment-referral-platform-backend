const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    getReferralIncome,

    getDirectReferrals,

    getReferralTree

} = require("../controllers/referralController");


// Referral Income History
router.get(
    "/income",
    authMiddleware,
    getReferralIncome
);


// Direct Referrals
router.get(
    "/direct",
    authMiddleware,
    getDirectReferrals
);


// Complete Referral Tree
router.get(
    "/tree",
    authMiddleware,
    getReferralTree
);

module.exports = router;