import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Reference to Student
  coaching: { type: mongoose.Schema.Types.ObjectId, ref: "Coaching", required: true }, // Reference to Coaching Center
  subject: { type: String, required: true }, // Subject name (e.g., Math, English)
  date: { type: Date, required: true }, // Test date
  totalMarks: { type: Number, required: true }, // Total marks of the test
  obtainedMarks: { type: Number, required: true }, // Marks obtained by the student
  remarks: { type: String }, // Optional field for teacher remarks
  season: { type: mongoose.Schema.Types.ObjectId, ref: "Season" }
});

export default mongoose.model("Test", TestSchema);
