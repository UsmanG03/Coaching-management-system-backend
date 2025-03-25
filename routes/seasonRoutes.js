import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getSeasons, getActiveSeason, addSeason, setActiveSeason } from "../controllers/seasonController.js";

const router = express.Router();

router.get("/", protect, getSeasons);
router.get("/active", protect, getActiveSeason);
router.post("/", protect, addSeason);
router.post("/set-active", protect, setActiveSeason);

export default router;
