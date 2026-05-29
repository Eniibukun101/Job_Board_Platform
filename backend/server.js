/**
 * Job Board Platform - Backend API
 * Developer: Anjolaoluwa Bawaallah-Olufemi
 * Matric Number: 24120111024
 * Role: Backend Team - API Routes, Controllers, Middleware & Models
 */

const dotenv = require('dotenv');
dotenv.config(); // MUST be first before any other requires

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
const { generalLimiter } = require('./middleware/rateLimiter');
const passport = require('./middleware/passport'); // Google OAuth

// Load models with associations
require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(generalLimiter);
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); // Initialize passport

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Job Board API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'An unexpected error occurred.' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
sequelize.authenticate()
  .then(() => console.log('✅ SQLite database connected'))
  .catch(err => console.error('❌ Database connection failed:', err));

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database models synced');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => console.error('❌ Failed to sync database:', err));

module.exports = app;