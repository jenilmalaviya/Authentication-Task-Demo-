import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import { handleError } from './utils/ApiError.js';
import router from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use("/api", router);
app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
