 import mongoose, { model, Schema } from "mongoose";
 
 const companySchema=new Schema({
     name:{
         type:String,
         required:true
     },
     description:{
         type:String,
    
         
     },
     website:{
        type:String,
    
        
    },
    location:{
        type:String,
        
    },
    logo:{
        type:String,  // url to company
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

 },{timestamps:true})
 const Company=model("Company",companySchema)
 export default Company;