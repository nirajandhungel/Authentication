import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
configDotenv()
const app = express();
app.use(cors({
    origin:process.env.CLIENT_URL || 'http://localhost:5134',
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.listen(process.env.PORT,()=>{console.log("The server is running on PORT : ",process.env.PORT)})
