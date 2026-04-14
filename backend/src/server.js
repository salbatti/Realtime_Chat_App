import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import  cookieParser from 'cookie-parser';
import path from 'path';
import { connect } from 'http2';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cors from "cors";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// console.log(process.env.PORT);

const PORT=ENV.PORT || 3003;


// payload too large cant go to express if we don't increase the limit
app.use(express.json({ limit: "10mb" }));
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(cookieParser()) // adding cookie parser middleware to parse cookies in incoming requests



app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoutes)


//make ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/","dist","index.html"))
    })
}


app.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`);
    connectDB()
})