import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import { handleError } from './utils/ApiError.js';

dotenv.config();

const app = express();

connectDB();
app.use(express.json());
app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
