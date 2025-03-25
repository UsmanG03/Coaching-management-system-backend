import Fee from "../models/Fee.js";
import Student from "../models/Student.js";
import Season from "../models/Season.js";

// @desc   Add a fee record for a student
// @route  POST /api/fees
// @access Private (Coaching Admin)
export const addFeeRecord = async (req, res) => {
  try {
    const { studentId, amount, month, status } = req.body;

    // Check if student exists
    const student = await Student.findOne({ _id: studentId, coaching: req.coaching.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }

    // Get the active season
    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }

    // Create fee record
    const feeRecord = new Fee({
      student: studentId,
      amount,
      month,
      status,
      coaching: req.coaching.id, // Link fee to correct coaching
      season: activeSeason._id, // Associate fee with the active season
    });

    await feeRecord.save();
    res.status(201).json({ message: "Fee record added successfully", feeRecord });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get all fee records for the active season
// @route  GET /api/fees
// @access Private (Coaching Admin)
export const getAllFeeRecords = async (req, res) => {
  try {
    // Get the active season
    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }

    const feeRecords = await Fee.find({ coaching: req.coaching.id, season: activeSeason._id })
      .populate("student", "name _class faculty section");

    res.json(feeRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get a single student's fee records for the active season
// @route  GET /api/fees/:studentId
// @access Private (Coaching Admin)
export const getStudentFeeRecords = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if student exists
    const student = await Student.findOne({ _id: studentId, coaching: req.coaching.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }

    // Get active season
    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });
    if (!activeSeason) {
      return res.status(400).json({ message: "No active season found" });
    }

    // Fetch student's fee records for the active season
    const feeRecords = await Fee.find({ student: studentId, coaching: req.coaching.id, season: activeSeason._id });

    res.json(feeRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Update a fee record (Mark as Paid, Change Amount, etc.)
// @route  PUT /api/fees/:feeId
// @access Private (Coaching Admin)
export const updateFeeRecord = async (req, res) => {
  try {
    const { feeId } = req.params;
    const { amount, status } = req.body;

    // Find and update fee record
    const updatedFee = await Fee.findOneAndUpdate(
      { _id: feeId, coaching: req.coaching.id },
      { amount, status },
      { new: true }
    );

    if (!updatedFee) {
      return res.status(404).json({ message: "Fee record not found or unauthorized" });
    }

    res.json({ message: "Fee record updated successfully", updatedFee });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Delete a fee record
// @route  DELETE /api/fees/:feeId
// @access Private (Coaching Admin)
export const deleteFeeRecord = async (req, res) => {
  try {
    const { feeId } = req.params;

    // Delete fee record
    const deletedFee = await Fee.findOneAndDelete({ _id: feeId, coaching: req.coaching.id });

    if (!deletedFee) {
      return res.status(404).json({ message: "Fee record not found or unauthorized" });
    }

    res.json({ message: "Fee record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
