import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminRegister = asyncHandler(async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;

  if (!FirstName) throw new ApiError(400, "First name is required");
  if (!LastName) throw new ApiError(400, "Last name is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");
  const existingUser = await User.findOne({ email });

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

export const userRegister = asyncHandler(async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;

  if (!FirstName) throw new ApiError(400, "First name is required");
  if (!LastName) throw new ApiError(400, "Last name is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");
  const existingUser = await User.findOne({ email });

  if (existingUser) throw new ApiError(400, "User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    FirstName,
    LastName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User does not exist");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });


  res.status(200).cookie("token", token,).json({
    message: "User logged in successfully",
    token,
    user,
  });
});

export const getAdminDetails = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const admin = await User.findOne({ _id: userId, role: "admin" });

  if (!admin) {
    throw new ApiError(403, "Access denied. Admin not found.");
  }

  res.status(200).json({
    message: "Admin details fetched successfully",
    admin,
  });
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const user = await User.findOne({ _id: userId, role: "user" });

  if (!user) {
    throw new ApiError(403, "Access denied. user not found.");
  }

  res.status(200).json({
    message: "Admin details fetched successfully",
    user,
  });
});