const express = require("express");
const router = express.Router();
const {
  register,
  login,
  googleAuthStart,
  googleAuthCallback,
  getMe,
  updateMe,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
} = require("../middleware/validate");

router.post("/register", authLimiter, validateRegister, register);
router.post("/login", authLimiter, validateLogin, login);
router.get("/google/start", googleAuthStart);
router.get("/google/callback", googleAuthCallback);
router.get("/me", protect, getMe);
router.put("/me", protect, validateUpdateProfile, updateMe);
router.put("/change-password", protect, validateChangePassword, changePassword);

module.exports = router;
