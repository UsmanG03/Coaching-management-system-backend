import jwt from "jsonwebtoken";
import Coaching from "../models/Coaching.js";

// Middleware to verify JWT token
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("bearer ")) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.coaching = await Coaching.findById(decoded.id).select("-password"); // Attach coaching info to request
    if (!req.coaching) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, token failed", error });
  }
};

// Middleware to restrict routes to coaching admins only
export const admin = (req, res, next) => {
  if (req.coaching && req.coaching.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};
