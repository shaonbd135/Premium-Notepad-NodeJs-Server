const userModel = require("../../models/user..model");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const verifyToken = async (req, res) => {
    const token = req.cookies.token;

    if (!req.cookies.token) {
        return res.status(401).send({
            success: false,
            message: "token not found"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const findUser = await userModel.findById(decoded.userId).populate('Notes');
        if (!findUser) {
            console.log('User not found')
            return res.status(401).send({
                success: false,
                message: "User not found"
            })
        }
        if (findUser.email !== decoded.email) {
            return res.status(401).send({
                success: false,
                message: "email not found"
            })
        }

        const user = {
            name: findUser.name,
            email: findUser.email,
            userStatus: findUser.userStatus,
            subscription: findUser.subscription,
            Notes: findUser.Notes
        };

        return res.status(200).send({
            success: true,
            message: "Authorized",
            user: user
        })



    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error
        })
    }
}

module.exports = { verifyToken } 