 import mongoose, { model, Schema } from "mongoose";

 const applicationSchema=new Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },
  applicent:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  status:{
    type:String,
    enum:["pending","accepted","rejected"],
    default:"pending"
  }
 },{timestamps:true})
 const Application=model("Application",applicationSchema)
 export default Application