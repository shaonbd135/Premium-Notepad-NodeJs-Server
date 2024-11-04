const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const connectDB = async () => {
    try {
        await mongoose.connect(`${DB_URL}/${DB_NAME}`);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
