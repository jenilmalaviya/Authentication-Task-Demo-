import express from "express";
import { adminRegister } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/admin/register",adminRegister)
export default router;
