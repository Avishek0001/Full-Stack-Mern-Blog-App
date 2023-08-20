const mongoose = require("mongoose");
const blogModel = require("../models/blogsModel");
const userModel = require("../models/userModel");


//GET ALL BLOGS
exports.getAllBlogsController =  async(req,res)=>{
    try{
        const blogs = await blogModel.find({}).populate('user')
        if(!blogs){
          
                return res.status(200).send({
                    message: "No blogs Found",
                    success: false,
                   
                })
            
        }
        return res.status(200).send({
            success:true,
            BlogContent: blogs.length,
            message:"All blogs Lists",
            blogs
        })
    }catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error while getting Blogs",
            success: false,
            err
        })
    }
}


exports.createBlogController = async(req,res)=>{
    try{
        const {title,description, user} = req.body;
        const image = req.file.filename;
        if(!title || !description || !image || !user){
            return res.status(400).send({
                message: "Please Give all Details",
                success: false,
                
            })
        }
        const existingUser = await userModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                message:"User doesn't exist",
                success:false
            })
        }

        const newBlog = new blogModel({title,description,image,user})
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()

        await newBlog.save();
        return res.status(200).send({
            message: "Successfully Created",
            success: true,
            newBlog
        })
    }catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error while getting Blogs",
            success: false,
            err
        })
    }

}


exports.updateBlogController = async(req,res)=>{
    try{
        const {id} = req.params;
        const {title,description,image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            message: "Successfully Updated",
            success: true,
            blog
        })
    }catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error while Updating Blogs",
            success: false,
            err
        })
    }

}

//Single Blog for a particular ID
exports.getBlogByIdController = async(req,res)=>{
    try{
        const {id} = req.params;
        const blog = await blogModel.findById(id).populate("user",['username']);
        if(!blog){
          
            return res.status(404).send({
                message: "No Blogs Found For this user",
                success: false,
               
            })
        
    }
    return res.status(200).send({
        success:true,
        message:"Blogs Found",
        blog
    })

    }catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error while Finding Blogs",
            success: false,
            err
        })
    }

}


exports.deleteBlogController = async(req,res)=>{
    try{
        const {id} = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"Blogs Deleted",
            blog
        })
    }catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error while Deleting Blogs",
            success: false,
            err
        })
    }

}

exports.userBlogController = async(req,res)=>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(401).send({
                success:false,
                message:"No blogs Found for this user"
            })
        }
            return res.status(200).send({
                success:true,
                message:"User Blogs",
                userBlog
            })
    }catch (err) {
        console.log(err);
        return res.status(400).send({
            message: "Error while Getting Ur Blogs",
            success: false,
            err
        })
    }
}