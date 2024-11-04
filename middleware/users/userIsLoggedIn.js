const userModel = require("../../models/user..model");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const userIsLoggedIn = async (req, res, next) => {

    if (!req.cookies.token) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized"
            })
        }
        if (user.email !== decoded.email) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized"
        })
    }
}

module.exports = {userIsLoggedIn} 