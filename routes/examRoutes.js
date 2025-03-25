import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { 
  addExamRecord, 
  getAllExamRecords, 
  getStudentExamRecords, 
  updateExamRecord, 
  deleteExamRecord 
} from "../controllers/examController.js";

const router = express.Router();

router.post("/", protect, addExamRecord);
router.get("/", protect, getAllExamRecords);
router.get("/:id", protect, getStudentExamRecords);// student id
router.put("/:id", protect, updateExamRecord); // Exam id
router.delete("/:id", protect, deleteExamRecord);// Exam id

export default router;
