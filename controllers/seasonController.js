import Season from "../models/Season.js";

// Get all seasons
export const getSeasons = async (req, res) => {
  try {
    const seasons = await Season.find();
    if(!seasons) return res.json({message:"No season found"})
    res.json(seasons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seasons", error });
  }
};

// Get active season
export const getActiveSeason = async (req, res) => {
  try {
    const activeSeason = await Season.findOne({ isActive: true });
    if (!activeSeason) return res.status(404).json({ message: "No active season found" });

    res.json(activeSeason);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active season", error });
  }
};

// Add a new season
export const addSeason = async (req, res) => {
  try {
    const { academicYear} = req.body;
    const season = new Season({ 
      academicYear, 
      isActive:true,
      coaching: req.coaching._id, 
    });
    await season.save();
    res.status(201).json(season);
  } catch (error) {
    res.status(500).json({ message: "Error adding season", error });
  }
};

// Set active season
export const setActiveSeason = async (req, res) => {
  try {
    const { seasonId } = req.body;
    
    // Reset all seasons to inactive
    await Season.updateMany({}, { isActive: false });

    // Set the selected season as active
    const updatedSeason = await Season.findByIdAndUpdate(seasonId, { isActive: true }, { new: true });

    if (!updatedSeason) return res.status(404).json({ message: "Season not found" });

    res.json({ message: "Active season updated", season: updatedSeason });
  } catch (error) {
    res.status(500).json({ message: "Error setting active season", error });
  }
};
