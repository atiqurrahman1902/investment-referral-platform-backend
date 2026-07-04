const User = require("../models/User");
const ReferralIncome = require("../models/ReferralIncome");

// Get Referral Income History
exports.getReferralIncome = async (req, res) => {

    try {

        const income = await ReferralIncome.find({
            receiver: req.user
        })
        .populate("generatedBy", "name email")
        .sort({ date: -1 });

        res.status(200).json(income);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get Direct Referrals
exports.getDirectReferrals = async (req, res) => {

    try {

        const referrals = await User.find({
            referredBy: req.user
        }).select("-password");

        res.status(200).json(referrals);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get Complete Referral Tree
exports.getReferralTree = async (req, res) => {

    try {

        async function buildTree(userId) {

            const children = await User.find({
                referredBy: userId
            }).select("-password");

            const tree = [];

            for (const child of children) {

                tree.push({

                    _id: child._id,

                    name: child.name,

                    email: child.email,

                    referralCode: child.referralCode,

                    children: await buildTree(child._id)

                });

            }

            return tree;

        }

        const tree = await buildTree(req.user);

        res.status(200).json(tree);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};