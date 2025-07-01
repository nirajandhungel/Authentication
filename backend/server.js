import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConn from './config/dbConfig.mjs';
import authRoutes from './routes/authRoutes.js'
dotenv.config();
dbConn();
const app = express();
app.use(cors({
    origin:process.env.CLIENT_URL || 'http://localhost:5134',
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use(authRoutes);

app.listen(process.env.PORT,()=>{console.log("The server is running on PORT : ",process.env.PORT)})
