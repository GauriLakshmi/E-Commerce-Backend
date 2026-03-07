// routes/authRoutes.js

const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  profile,
  checkUser,
  checkAdmin,
  getAllUsers, // added for admin
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// ---------------- PUBLIC ROUTES ----------------
router.post("/signup", signup);
router.post("/login", login);

// ---------------- PROTECTED ROUTES ----------------
router.get("/profile", authMiddleware, profile);
router.get("/check-user", authMiddleware, checkUser);
router.get("/check-admin", authMiddleware, checkAdmin);

// ---------------- ADMIN-ONLY ROUTES ----------------
router.get("/users", authMiddleware, getAllUsers); // returns all users/customers

// ---------------- LOGOUT ----------------
router.post("/logout", authMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
});

module.exports = router;