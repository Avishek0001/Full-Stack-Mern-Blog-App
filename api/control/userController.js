

const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const secret = 'djhsojnwsgnownogslkjg45wg5gg'





exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all details"
            });
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                message: "User already exist",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        

        //user Save
        const user = new userModel({ username, email, password:hashedPassword })
        await user.save()
        return res.status(201).send({

            success: true,
            message: "Successful Registration",
            user
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error in Registration",
            success: false,
            err
        })
    }
}


//LOGIN Controller

exports.loginController = async(req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                message: "Please fill all details",
                success: false,
                
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                message: "Email is not registered",
                success: false,
                
            })
        }
        //password checking
        const passwordChecking = await bcrypt.compare(password,user.password)
        if(passwordChecking){
           
            jwt.sign({email,id:user._id}, secret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id:user._id,
                    email,
                });
            });
            return res.status(201).send({
                message: "Login Successfully",
                success: true,
                user
            })
            
        }else{
            return res.status(401).send({
                message: "Please check all details",
                success: false,
            })
        }


    }catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error in Login",
            success: false,
            err
        })
    }
 }