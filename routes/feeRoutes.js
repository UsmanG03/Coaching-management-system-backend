import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { 
  addFeeRecord, 
  getAllFeeRecords, 
  getStudentFeeRecords, 
  updateFeeRecord, 
  deleteFeeRecord 
} from "../controllers/feeController.js";

const router = express.Router();

router.post("/", protect, addFeeRecord);
router.get("/", protect, getAllFeeRecords);
router.get("/:studentId", protect, getStudentFeeRecords);// student Id
router.put("/:feeId", protect, updateFeeRecord);//fee Id
router.delete("/:feeId", protect, deleteFeeRecord);// fee Id

export default router;
