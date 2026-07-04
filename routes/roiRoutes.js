const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getROIHistory
} = require("../controllers/roiController");


router.get(
    "/history",
    authMiddleware,
    getROIHistory
);

module.exports = router;