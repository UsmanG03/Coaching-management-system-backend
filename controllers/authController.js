import Coaching from "../models/Coaching.js";
import Season from "../models/Season.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc   Register a new coaching center
// @route  POST /api/auth/register
// @access Public
export const register = async (req, res) => {
  try {
    const { name, email, password,ownerName, address, contact, isAdmin } = req.body;

    // Check if coaching already exists
    const existingCoaching = await Coaching.findOne({ email });
    if (existingCoaching) {
      return res.status(400).json({ message: "Coaching already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new coaching
    const coaching = new Coaching({
      name,
      ownerName,
      isAdmin,
      contact,
      address,
      email,
      password: hashedPassword,
    });

    await coaching.save();

    // Create an initial season for the new coaching center
    // const newSeason = new Season({
    //   coaching: coaching._id,
    //   academicYear:"2024-2025",
    //   isActive: true, // Mark it as active
    // });

    // await newSeason.save();

    res.status(201).json({ message: "Coaching registered successfully", coaching});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Login a coaching center
// @route  POST /api/auth/login
// @access Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find coaching by email
    const coaching = await Coaching.findOne({ email });
    if (!coaching) {
      return res.status(404).json({ message: "Coaching not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, coaching.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: coaching._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Fetch the active season for the coaching center
    const activeSeason = await Season.findOne({ coaching: coaching._id, isActive: true });

    res.json({
      token,
      coaching: { id: coaching._id, name: coaching.name, email: coaching.email },
      season: activeSeason || null, // Include the active season if available
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get coaching profile (Authenticated User)
// @route  GET /api/auth/profile
// @access Private
export const getProfile = async (req, res) => {
  try {
    const coaching = await Coaching.findById(req.coaching.id).select("-password");
    if (!coaching) {
      return res.status(404).json({ message: "Coaching not found" });
    }

    // Fetch the active season
    const activeSeason = await Season.findOne({ coaching: req.coaching.id, isActive: true });

    res.json({ coaching, season: activeSeason || null });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
