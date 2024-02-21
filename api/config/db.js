const mongoose = require("mongoose");
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDB Databse');
    }catch (err){
        console.log('Mongo Connection Err' + err);
    }
}
module.exports = connectDB;