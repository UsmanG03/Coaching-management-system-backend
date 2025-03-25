import Test from "../models/Test.js";
import Student from "../models/Student.js";
import Season from "../models/Season.js";

// @desc   Add a test record for a student
// @route  POST /api/tests
// @access Private (Coaching Admin)
export const addTestRecord = async (req, res) => {
  try {
    const { studentId, subject, marksObtained, totalMarks, testDate, remarks } = req.body;

    // Check if student exists
    const student = await Student.findOne({ _id: studentId, coaching: req.coaching.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }

    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }

    // Create test record
    const testRecord = new Test({
      student: studentId,
      subject,
      marksObtained,
      totalMarks,
      testDate,
      remarks,
      coaching: req.coaching.id, 
      season: activeSeason._id, 
    });

    await testRecord.save();
    res.status(201).json({ message: "Test record added successfully", testRecord });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get all test records for the active season
// @route  GET /api/tests
// @access Private (Coaching Admin)
export const getAllTestRecords = async (req, res) => {
  try {
    // Get the active season
    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }
   
    const testRecords = await Test.find({ coaching: req.coaching.id, season: activeSeason._id })
      .populate("student", "name faculty section");

    res.json(testRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get a single student's test records for the active season
// @route  GET /api/tests/:studentId
// @access Private (Coaching Admin)
export const getStudentTestRecords = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if student exists
    const student = await Student.findOne({ _id: studentId, coaching: req.coaching.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }

    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }

    const testRecords = await Test.find({ student: studentId, coaching: req.coaching.id, season: activeSeason._id });

    res.json(testRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Update a test record
// @route  PUT /api/tests/:testId
// @access Private (Coaching Admin)
export const updateTestRecord = async (req, res) => {
  try {
    const { testId } = req.params;
    const { subject, marksObtained, totalMarks, testDate, remarks } = req.body;

    // Find and update test record
    const updatedTest = await Test.findOneAndUpdate(
      { _id: testId, coaching: req.coaching.id },
      { subject, marksObtained, totalMarks, testDate, remarks },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test record not found or unauthorized" });
    }

    res.json({ message: "Test record updated successfully", updatedTest });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Delete a test record
// @route  DELETE /api/tests/:testId
// @access Private (Coaching Admin)
export const deleteTestRecord = async (req, res) => {
  try {
    const { testId } = req.params;

    // Delete test record
    const deletedTest = await Test.findOneAndDelete({ _id: testId, coaching: req.coaching.id });

    if (!deletedTest) {
      return res.status(404).json({ message: "Test record not found or unauthorized" });
    }

    res.json({ message: "Test record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
