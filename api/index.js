const express = require('express');
const mongodb = require("mongodb")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors")
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const multer = require("multer")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://Avishek-Mern-Blog:avishek2001@cluster0.uhuwjdg.mongodb.net/?retryWrites=true&w=majority")

const userRoute= require("./routes/userRoute")
const blogsRoutes = require("./routes/blogsRoute")
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user",userRoute);
app.use("/api/v1/blogs",blogsRoutes);

app.listen(4000,()=>{
    console.log("Server is running");
})