const express = require('express');
const mongodb = require("mongodb")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors")
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const multer = require("multer");
const dotenv = require("dotenv");
const connectDB = require("./config/db")

dotenv.config();

const BASE_URL = 4000


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
// mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(DATABASE_URL);
connectDB();


const userRoute = require("./routes/userRoute")
const blogsRoutes = require("./routes/blogsRoute")
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blogs", blogsRoutes);

app.listen(BASE_URL, () => {
    console.log("Server is running");
})