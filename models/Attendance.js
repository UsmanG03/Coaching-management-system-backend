import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Reference to Student
  coaching: { type: mongoose.Schema.Types.ObjectId, ref: "Coaching", required: true }, // Reference to Coaching Center
  date: { type: Date, default: Date.now  },
  status: { type: String, enum: ["Present", "Absent", "Leave"], required: true },
  season: { type: mongoose.Schema.Types.ObjectId, ref: "Season" },
  // month: { type: String, required: true }, // Example: "March-2025" for monthly records
});

export default mongoose.model("Attendance", AttendanceSchema);
