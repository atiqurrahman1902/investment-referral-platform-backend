const ROIHistory = require("../models/ROIHistory");


// Get ROI History

exports.getROIHistory = async (req, res) => {

    try {

        const history = await ROIHistory.find({
            userId: req.user
        })
        .populate("investmentId")
        .sort({ date: -1 });

        res.status(200).json(history);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};