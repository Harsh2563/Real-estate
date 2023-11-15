import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRouter from "./routes/authroute.js"
import listingRouter from './routes/listingRouter.js'
import userRouter from "./routes/userroute.js"
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log("Connected to database");
}).catch((err)=> {
    console.log(err);
})

app.use('/api/listing',listingRouter)
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use((err,req,res,next)=> {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})