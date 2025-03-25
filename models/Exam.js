import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Reference to Student
  coaching: { type: mongoose.Schema.Types.ObjectId, ref: "Coaching", required: true }, // Reference to Coaching Center
  examType: { type: String, required: true }, // Example: "Midterm", "Final", "Quarterly"
  date: { type: Date, required: true }, // Exam date
  subjects: [
    {
      name: { type: String, required: true }, // Subject name (e.g., Math, Science)
      totalMarks: { type: Number, required: true }, // Total marks of the subject
      obtainedMarks: { type: Number, required: true }, // Marks obtained by the student
    },
  ],
  totalMarks: { type: Number, required: true }, // Total marks of the entire exam
  obtainedMarks: { type: Number, required: true }, // Total marks obtained across subjects
  percentage: { type: Number, required: true }, // Calculated percentage
  resultStatus: { type: String, enum: ["Pass", "Fail"], required: true }, // Pass or Fail status
  remarks: { type: String }, // Optional field for teacher remarks
  season: { type: mongoose.Schema.Types.ObjectId, ref: "Season" }
});

export default mongoose.model("Exam", ExamSchema);
