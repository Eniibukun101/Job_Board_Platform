const express = require('express');
const router = express.Router();
const { register, login, getMe, updateMe, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword
} = require('../middleware/validate');

// Standard auth routes
router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.get('/me', protect, getMe);
router.put('/me', protect, validateUpdateProfile, updateMe);
router.put('/change-password', protect, validateChangePassword, changePassword);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/google/failed', session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
    res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:3000'}/auth/success?token=${token}`);
  }
);

router.get('/google/failed', (req, res) => {
  res.status(401).json({ message: 'Google authentication failed.' });
});

module.exports = router;