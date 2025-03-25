import mongoose from "mongoose";

const SeasonSchema = new mongoose.Schema({
  academicYear: { type: String, required:true }, // Example: "2024-2025"
  isActive: { type: Boolean, default: false , required:true}, // Only one season should be active per coaching
  coaching: { type: mongoose.Schema.Types.ObjectId, ref: "Coaching", }, // Coaching reference
  students: { type: mongoose.Schema.Types.ObjectId, ref: "Student", }, // Students for this season
  attendance: { type: mongoose.Schema.Types.ObjectId, ref: "Attendance",  }, // Attendance linked to this season
  fee: { type: mongoose.Schema.Types.ObjectId, ref: "Fee", }, // Fees for this season
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test",  }, // Test results for this season
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", }, // Exams linked to this season
}, { timestamps: true });

export default mongoose.model("Season", SeasonSchema);