import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Season from "../models/Season.js";

// Function for mark attendance
// POST /api/attendance
export const markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;

    const student = await Student.findOne({ _id: studentId, coaching: req.coaching._id });
    if (!student) return res.status(404).json({ message: "Student not found or unauthorized" });
    
    // Get the active season for the coaching center
    const season = await Season.findOne({ coaching: req.coaching._id, isActive: true });
    if (!season) return res.status(400).json({ message: "No active season found!" });
    
    
    const today = new Date().setHours(0, 0, 0, 0); // Get today's date
    console.log(today);

    const existingAttendance = await Attendance.findOne({
      student: student._id,
      date: today,
      season:season._id
    });

    console.log(existingAttendance);
    if(existingAttendance)return res.json({message:"attendance marked for today"})

    const attendance = new Attendance({
      student: studentId,
      date:today,
      status,
      coaching: req.coaching._id, // to verify attendance belongs to the authenticated coaching center
      season: season._id, // mark for active season
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
};


// Function for get all attendance and filter if required 
// GET /api/attendance
export const getAttendanceRecords = async (req, res) => {
  try {
    const { date, status, _class, faculty, section, student_type, seasonId } = req.query;

    let filter = { coaching: req.coaching._id };
    if (status) filter.status = status;
    if (seasonId) filter.season = seasonId; 

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceRecords = await Attendance.find(filter)
      .populate({
        path: "student",
        match: {
          ...(_class && { _class }),
          ...(faculty && { faculty }),
          ...(section && { section }),
          ...(student_type && { student_type }),
        },
      })
      .sort({ date: -1 });

    const filteredRecords = attendanceRecords.filter(record => record.student);
    res.status(200).json(filteredRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance records", error });
  }
};

// Function for get single student attendance
// GET /api/attendance/:studentId

export const getStudentAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.studentId, coaching: req.coaching._id });
    if (!student) return res.status(404).json({ message: "Student not found or unauthorized" });

    const attendanceRecords = await Attendance.find({ student: req.params.studentId }).sort({ date: -1 });
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student attendance", error });
  }
};
