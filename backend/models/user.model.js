import mongoose, { model, Schema } from "mongoose";

const UserSchema=new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Student","Recruiter"],
        default:"Student",
    },
    profile:{
         bio:{
           type:String, 
         },
         skills:[{
            type:String
         }],
         resume:{
            type:String,   // url to resume file
         },
         rusumeOriginalName:{type:String},
         company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company"
        },
        profilePhoto:{
            type:String,
            default:""
        }
    },

},{timestamps:true})
const User=model("User",UserSchema)

export default User;