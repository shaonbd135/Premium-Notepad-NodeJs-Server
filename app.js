require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/Database/DatabaseConfig");
const editorPermissions = require("./config/Admin/EditorConfig");
const publicRoutes = require("./routes/publicRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require('cookie-parser')

connectDB();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,    
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors( corsOptions ));
app.use(cookieParser());


app.use("/", publicRoutes);
app.use("/api/user", userRoutes);


module.exports = app;