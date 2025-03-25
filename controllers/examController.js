import Exam from "../models/Exam.js";
import Student from "../models/Student.js";
import Season from "../models/Season.js";

// @desc   Add an exam record for a student
// @route  POST /api/exams
// @access Private (Coaching Admin)
export const addExamRecord = async (req, res) => {
  try {
    const { studentId, subject, marksObtained, totalMarks, examDate, remarks } = req.body;

    // Validate marks
    if (marksObtained > totalMarks) {
      return res.status(400).json({ message: "Marks obtained cannot exceed total marks" });
    }

    // Validate exam date
    if (isNaN(Date.parse(examDate))) {
      return res.status(400).json({ message: "Invalid exam date" });
    }

    // Check if student exists and belongs to coaching center
    const student = await Student.findOne({ _id: studentId, coaching: req.coaching.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }

    // Get the active season
    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }

    // Prevent duplicate exam records for the same student, subject, and season
    const existingExam = await Exam.findOne({
      student: studentId,
      subject,
      season: activeSeason._id,
      coaching: req.coaching.id,
    });
    if (existingExam) {
      return res.status(400).json({ message: "Exam record already exists for this subject in the current season" });
    }

    // Create exam record
    const examRecord = new Exam({
      student: studentId,
      subject,
      marksObtained,
      totalMarks,
      examDate,
      remarks,
      coaching: req.coaching.id,
      season: activeSeason._id, // Associate with active season
    });

    await examRecord.save();
    res.status(201).json({ message: "Exam record added successfully", examRecord });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get all exam records for the active season
// @route  GET /api/exams
// @access Private (Coaching Admin)
export const getAllExamRecords = async (req, res) => {
  try {
    // Get active season
    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }
   
    const examRecords = await Exam.find({
      coaching: req.coaching.id,
      season: activeSeason._id, // Fetch only active season records
    }).populate("student", "name faculty section");

    res.json(examRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get a single student's exam records for the active season
// @route  GET /api/exams/:studentId
// @access Private (Coaching Admin)
export const getStudentExamRecords = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if student exists and belongs to coaching
    const student = await Student.findOne({ _id: studentId, coaching: req.coaching.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }

    // Get active season
    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }

    // Fetch student's exam records for the active season
    const examRecords = await Exam.find({
      student: studentId,
      coaching: req.coaching.id,
      season: activeSeason._id,
    });

    res.json(examRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Update an exam record
// @route  PUT /api/exams/:examId
// @access Private (Coaching Admin)
export const updateExamRecord = async (req, res) => {
  try {
    const { examId } = req.params;
    const { subject, marksObtained, totalMarks, examDate, remarks } = req.body;

    // Validate marks
    if (marksObtained > totalMarks) {
      return res.status(400).json({ message: "Marks obtained cannot exceed total marks" });
    }

    // Validate exam date
    if (examDate && isNaN(Date.parse(examDate))) {
      return res.status(400).json({ message: "Invalid exam date" });
    }

    // Find and update exam record
    const updatedExam = await Exam.findOneAndUpdate(
      { _id: examId, coaching: req.coaching.id },
      { subject, marksObtained, totalMarks, examDate, remarks },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Exam record not found or unauthorized" });
    }

    res.json({ message: "Exam record updated successfully", updatedExam });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Delete an exam record
// @route  DELETE /api/exams/:examId
// @access Private (Coaching Admin)
export const deleteExamRecord = async (req, res) => {
  try {
    const { examId } = req.params;

    // Delete exam record
    const deletedExam = await Exam.findOneAndDelete({ _id: examId, coaching: req.coaching.id });

    if (!deletedExam) {
      return res.status(404).json({ message: "Exam record not found or unauthorized" });
    }

    res.json({ message: "Exam record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
