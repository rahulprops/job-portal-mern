import mongoose from "mongoose";
import 'dotenv/config.js'
const dbConntect=()=>{
    try {
        const db = mongoose.connect(process.env.DB)
        if(db){
            console.log("database connect sucessful")
        }else{
            console.log("database connect failed")
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
export default dbConntect;