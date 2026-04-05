import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
const app = express();
dotenv.config();

console.log(process.env.PORT);

const PORT=process.env.PORT || 3003;

app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoutes)


app.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`);
})