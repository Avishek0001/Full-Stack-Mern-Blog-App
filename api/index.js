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

const PORT = process.env.PORT || 4000


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads',express.static(__dirname + "/uploads"))
connectDB();


const userRoute = require("./routes/userRoute")
const blogsRoutes = require("./routes/blogsRoute")
app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.get("/", (req,res)=>{
    res.send("Hello")
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blogs", blogsRoutes);

app.listen(PORT, () => {
    console.log("Server is running");
})