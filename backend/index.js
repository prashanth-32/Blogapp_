import express, { json } from "express"
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import connectDB from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRouter from "./routes/posts.js"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();


const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser());
app.use(json());
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use('/users',userRouter);
app.use('/api',postRouter);

app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`);
    connectDB();
})

app.get("",(req,res)=>{
    res.json("Working fine");
})


