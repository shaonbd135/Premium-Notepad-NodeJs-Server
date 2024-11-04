const jwt = require("jsonwebtoken");
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (userId, email) => {
    const payload = { userId, email };
    const options = { expiresIn: '3d' }
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

module.exports = { generateToken };