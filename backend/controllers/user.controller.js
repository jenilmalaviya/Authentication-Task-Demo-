import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otp.js";
import { sendOTPEmail } from "../utils/email.js";

export const adminRegister = asyncHandler(async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;

  if (!FirstName || !LastName || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.isVerified) {
    throw new ApiError(400, 'Email is already registered and verified');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  let user;

  if (existingUser) {
    user = existingUser;
    user.otp = otp;
    user.otpExpiry = otpExpiry;
  } else {
    user = new User({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
      role: 'admin',
    });
  }

  await user.save();

  await sendOTPEmail(email, otp);


  res.status(200).json({ message: 'OTP sent to email', email });
});


export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isVerified) {
    throw new ApiError(400, 'User is already verified');
  }


  const currentTime = Date.now();
  const otpExpiryTime = user.otpExpiry;


  if (currentTime > otpExpiryTime) {
    throw new ApiError(400, 'OTP has expired');
  }


  const receivedOtp = otp.toString().trim();
  const storedOtp = user.otp.toString().trim();

  console.log(storedOtp, "oooottttppp", receivedOtp);

  if (storedOtp !== receivedOtp) {
    throw new ApiError(400, 'Invalid OTP');
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.status(200).json({ message: 'Email verified. Registration complete.' });
});

export const userRegister = asyncHandler(async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;

  if (!FirstName || !LastName || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.isVerified) {
    throw new ApiError(400, 'Email is already registered and verified');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  let user;

  if (existingUser) {
    user = existingUser;
    user.otp = otp;
    user.otpExpiry = otpExpiry;
  } else {
    user = new User({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
      role: 'user',
    });
  }

  await user.save();

  await sendOTPEmail(email, otp);


  res.status(200).json({ message: 'OTP sent to email', email });
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User does not exist");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid credentials");

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

  const tokenOpen = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
  }
  res.status(200).cookie("token", token, tokenOpen).json({
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
    message: "User details fetched successfully",
    user,
  });
});

export const logout  = asyncHandler(async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,        
      sameSite: "none",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});