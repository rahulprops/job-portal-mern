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

 //! login user
 export const login= async (req,res)=>{
    const {email,password,role}=req.body;
    if(!email || !password || !role){
        return res.status(400).json({message:"all fields required"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message:"please enter valid email "})
    }
    try {
        const isUser= await User.findOne({email})
        if(!isUser){
            return res.status(404).json({message:"user not found"})
        }
        // password check
        const isValidPassword=await bcrypt.compare(password,isUser.password)
        
        if(isValidPassword){
              if(role!== isUser.role){
                return res.status(400).json({message:"Account does't exist with current role"})
              }

            return res.status(200).json({message:"user login sucessful "})
        }else{
            return res.status(400).json({message:"password worng"})
        }
    } catch (error) {
         return res.status(500).json({message:`server error ${error.message}`})
    }
 }

 //! logout user
  export const logout=async (req,res)=>{
    try {
         return res.status(200).cookie("token","",{maxAge:0}).json({message:"user logout sucesful"})
    } catch (error) {
        return res.status(500).json({message:`server error ${error.message}`})
    }
  }

  //! updateProfile

  export const updateProfile = async (req,res)=>{
    const {fullname,email,phoneNumber,bio,skills}=req.body;
      if(!fullname || !email || !phoneNumber || !bio || !skills){
         return res.status(400).json({
            message:"Someting is missing"
         })
      }
      const skillsArrary=skills.split(",");
      const userId=req.id;  
     try {
         
         let user = await User.findById(userId)

         if(!user){
            return res.status(400).json({message:" user not found"})
         }
          

         // updating data
         user.fullname=fullname,
         user.email=email,
         user.phoneNumber=phoneNumber,
         user.profile.bio=bio,
         user.profile.skills=skillsArrary

         // resume

         await user.save()

         user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
         }
         return res.status(200).json({
            message:"profile updated sucessfuly",
            user
         })
     } catch (error) {
         return res.status(500).json({message:`server error ${error.message}`})
     }
  }