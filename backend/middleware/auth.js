import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import  asyncHandler  from "../utils/asyncHandler.js";

const verifyJwt = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized request. Token not found.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

const verifyPermission = (roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!req.user?.id) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (roles.includes(req.user.role)) {
      next();
    } else {
      throw new ApiError(403, "You are not allowed to perform this action");
    }
  });

export { verifyJwt, verifyPermission };
