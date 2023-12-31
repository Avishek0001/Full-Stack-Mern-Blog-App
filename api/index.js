const express = require('express');
const mongodb = require("mongodb")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors")
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const multer = require("multer")

const BASE_URL = process.env.BASE_URL || 4000

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://Avishek-Mern-Blog:avishek2001@cluster0.uhuwjdg.mongodb.net/?retryWrites=true&w=majority")

const userRoute= require("./routes/userRoute")
const blogsRoutes = require("./routes/blogsRoute")
app.use(cors({ origin: ['https://client-mern-blog-app.vercel.app'] ,credentials:true,,methods:["POST", "GET", "PUT", "DELETE"],,
  allowedHeaders: ['Content-Type', 'Authorization']}));
// app.use(cors({credentials:true, origin:['https://client-mern-blog-app.vercel.app'],methods:["POST", "GET", "PUT", "DELETE"]}))
app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("HEllo")
})
app.use("/api/v1/user",userRoute);
app.use("/api/v1/blogs",blogsRoutes);

app.listen(BASE_URL,()=>{
    console.log("Server is running");
})
