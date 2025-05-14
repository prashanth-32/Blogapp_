import mongoose from "mongoose"
import { configDotenv } from "dotenv";

configDotenv();

const connection = process.env.MONGODB_URI;

// console.log(connection);

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(connection);
        console.log("Connected to the database successfully!");
    }
    catch(err){
        console.log("Error while connecting database",err);
    }
}

export default connectDB;