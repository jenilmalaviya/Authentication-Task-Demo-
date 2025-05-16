import express from "express";
import { adminRegister, getAdminDetails, getUserDetails, login, logout, userRegister, verifyOTP } from "../controllers/user.controller.js";
import { verifyJwt, verifyPermission } from "../middleware/auth.js";

const router = express.Router();

router.post("/admin/register",adminRegister)
router.post("/user/register",userRegister)
router.post("/login",login)
router.get("/admin-details",verifyJwt,verifyPermission(['admin']),getAdminDetails)
router.get("/user-details",verifyJwt,verifyPermission(['user']),getUserDetails)
router.post("/verify-email",verifyOTP)
router.post("/logout",logout)
export default router;
