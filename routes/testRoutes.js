import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { 
  addTestRecord, 
  getAllTestRecords, 
  getStudentTestRecords, 
  updateTestRecord, 
  deleteTestRecord 
} from "../controllers/testController.js";

const router = express.Router();

router.post("/", protect, addTestRecord);
router.get("/", protect, getAllTestRecords);
router.get("/:id", protect, getStudentTestRecords);// student id
router.put("/:id", protect, updateTestRecord); // test id
router.delete("/:id", protect, deleteTestRecord); // test id

export default router;
