const mongoose=require("mongoose")

const blogSchema = new mongoose.Schema({
    title:{
        type:String, 
        required:[true,'Title is required']
    },
    description:{
        type:String, 
        required:[true,'description is required']
    },
    image:{
        type: String,
        required: [true, "image is require"],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }
},
{ timestamps: true })
const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;