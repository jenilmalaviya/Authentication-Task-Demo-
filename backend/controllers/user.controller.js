import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";

export const adminRegister = asyncHandler(async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;

  if (!FirstName) throw new ApiError(400, "First name is required");
  if (!LastName) throw new ApiError(400, "Last name is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");
  const existingUser = await User.findOne({ email });

  console.log("existingUser",existingUser);
  if (existingUser) throw new ApiError(400, "User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    FirstName,
    LastName,
    email,
    password: hashedPassword,
    role: "admin",
  });
  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});
