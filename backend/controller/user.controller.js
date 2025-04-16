 import validator from 'validator'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt'
//! register user
 export const register=async (req,res)=>{
    const {fullname,email,phoneNumber,password,role}=req.body;
    if(!fullname || !email || !phoneNumber || !password ||!role){
        return res.status(400).json({message:"all feilds requied"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message:"please enter valid email"})
    }
    try {
        const user= await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exists"})
        }
       //hashpassword
       const hashPassword= await bcrypt.hash(password,12)
       const newUser=new User({
        fullname,
        email,
        phoneNumber,
        password:hashPassword,
        role
       })
       if(newUser){
         await newUser.save()
         return res.status(201).json({message:"new create sucessful",data:newUser})
       }else{
        return res.status(400).json({message:"user create failed"})
       }
        
    } catch (error) {
        return res.status(500).json({message:`server error ${error.message}`})
    }
 }