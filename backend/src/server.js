import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from 'path';

dotenv.config();
const app = express();
const __dirname = path.resolve();

console.log(process.env.PORT);

const PORT=process.env.PORT || 3003;

app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoutes)

//make ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/","dist","index.html"))
    })
}


app.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`);
})