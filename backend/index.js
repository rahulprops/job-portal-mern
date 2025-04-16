import express from 'express'
import 'dotenv/config.js'
import dbConntect from './utils/db.js';


const app = express()
const port=process.env.PORT || 3000;



//! server start
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    dbConntect()
})