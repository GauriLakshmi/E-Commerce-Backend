const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  profile,
  checkUser,
  checkAdmin
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", authMiddleware, profile);

router.get("/check-user", authMiddleware, checkUser);

router.get("/check-admin", authMiddleware, checkAdmin);


module.exports = router;