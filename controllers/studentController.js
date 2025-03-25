import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Season from "../models/Season.js";

// @desc   Get all students with optional filters
// @route  GET /api/students
// @access Protected
export const getStudents = async (req, res) => {
  try {
    const { address, _class, faculty, section, student_type, seasonId } = req.query;
    const coachingId = req.coaching._id; // Get coaching ID from authenticated user
    let filter = { coaching: coachingId, season: seasonId };
    if (_class) filter._class = _class;
    if (address) filter.address = address;
    if (faculty) filter.faculty = faculty;
    if (section) filter.section = section;
    if (student_type) filter.student_type = student_type;

    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// @desc   Get a single student by ID
// @route  GET /api/students/:id
// @access Protected
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, coaching: req.coaching._id });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// @desc   Add a new student
// @route  POST /api/students
// @access Protected
export const addStudent = async (req, res) => {
  try {
    const { roll_number, name, father_name, contact, father_contact, address, monthly_fee, admission_date, _class, faculty, section, student_type } = req.body;

    const season = await Season.findOne({ coaching: req.coaching._id, isActive: true });
    if (!season) return res.status(400).json({ message: "No active season found!" });
    
    const oldStudent = await Student.findOne({ roll_number:roll_number });
    
    if (oldStudent) return res.json({ message: "student exist!" })

    const newStudent = new Student({
      roll_number,
      name,
      father_name,
      contact,
      father_contact,
      address,
      monthly_fee,
      admission_date,
      _class,
      faculty,
      section,
      student_type,
      coaching: req.coaching._id,
      season: season._id, // Assign the student to the active season
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
};

// @desc   Update student details
// @route  PUT /api/students/:id
// @access Protected
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, coaching: req.coaching._id });

    if (!student) return res.status(404).json({ message: "Student not found" });

    Object.assign(student, req.body);
    await student.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// @desc   Delete a student
// @route  DELETE /api/students/:id
// @access Protected
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, coaching: req.coaching._id });

    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.deleteOne();

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
