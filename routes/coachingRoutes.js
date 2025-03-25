import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register); // Register a coaching center
router.post("/login", login); // Login and get JWT token
router.get("/profile", protect, getProfile); // Get logged-in coaching profile

export default router;
