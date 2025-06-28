import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConn  = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully ');
    }catch (err){
        console.log("Db Error : ", err);
        process.exit(1);

    }
}
export default  dbConn;