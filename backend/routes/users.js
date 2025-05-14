import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config();

const router = express.Router();

router.use(cookieParser());

const salt = bcrypt.genSaltSync(10);

const secret = process.env.SECRET;


// Register

router.post('/register', async (req, res) => {
    let { username, password, email } = req.body;
    try {
        // console.log(username,password,email);
        if (!username || !password || !email) {
            return res.status(400).send({ message: "No field should be empty" });
        }
        const userExists = await User.findOne({ username:username });
        // console.log(userExists);
        if (userExists) {
            return res.status(400).json({ message: "Exists" });
        }
        const newPassword = await bcrypt.hash(password, salt);
        const user = await User.create({username,password:newPassword,email});
        const token = jwt.sign({userId:user._id,username,email},secret,{expiresIn:"1d"});
        res.cookie('token',token,{secure:true,sameSite:"none"});
        res.status(200).json({userId:user._id,username,email});
    }
    catch (err) {
        res.status(500).json({ "message": err });
    }
})

//login

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try
    {
        if(!username || !password) 
            return res.status(400).json({message:"Invalid credentials!"});
        const user = await User.findOne({username});
        // console.log(user);
        if(!user)
            return res.status(400).json({message:"No user with given credentials"});
        const passOk = bcrypt.compare(password,user.password);
        if(!passOk) 
            return res.status(400).json({message:"Wrong password"});
        const token = jwt.sign({userId:user._id,username,email:user.email},secret,{expiresIn:"1d"});
        res.cookie('token',token,{secure:true,sameSite:"none"});
        res.status(200).json({userId:user._id,username,email:user.email});
    }
    catch(err)
    {
        console.error("Error in logging In",err);
        res.status(400).json({message:err});
    }
})

//logout
router.post('/logout',async (req, res) => {
    try{
        return res.clearCookie("token",{sameSite:"none",secure:true}).send({message:"Logged out!"});
    }
    catch(err)
    {
        console.error(err);
        res.status(400).json({message:err});
    }
})              

//get User Id
router.get('/info',(req,res)=>{
    const token = req.cookies.token;
    if(!token)
        return res.status(400).json({id:""});
    const {userId,username,email} = jwt.decode(token);
    res.status(200).send({userId,username,email});
})


export default router;