const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  testEmail,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);
// Temporary route for testing
router.get("/test-email", testEmail);

module.exports = router;