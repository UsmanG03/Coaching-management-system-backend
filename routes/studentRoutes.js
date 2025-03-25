import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { 
  getStudents, 
  addStudent, 
  getStudentById, 
  updateStudent, 
  deleteStudent, 
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", protect, getStudents);
router.post("/", protect, addStudent);
router.get("/:id", protect, getStudentById);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

export default router;
