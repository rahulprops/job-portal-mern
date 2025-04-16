import express from 'express'
import 'dotenv/config.js'
import dbConntect from './utils/db.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
const port=process.env.PORT || 3000;

//! middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions={
    origin:"",
    credentials:true
}
app.use(cors(corsOptions))


//! server start
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    dbConntect()
})