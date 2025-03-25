import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { 
  markAttendance, 
  getStudentAttendance, 
  getAttendanceRecords 
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", protect, markAttendance);
router.get("/:studentId", protect, getStudentAttendance); // studentId
router.get("/", protect, getAttendanceRecords); // Filters by class, faculty, section, studentType

export default router;
