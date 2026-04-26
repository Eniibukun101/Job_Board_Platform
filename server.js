const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load models with associations
require('./models');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    console.log(`\n📋 Available endpoints:`);
    console.log(`   GET    /api/health`);
    console.log(`   POST   /api/auth/register`);
    console.log(`   POST   /api/auth/login`);
    console.log(`   GET    /api/auth/me`);
    console.log(`   PUT    /api/auth/me`);
    console.log(`   PUT    /api/auth/change-password`);
    console.log(`   GET    /api/jobs`);
    console.log(`   GET    /api/jobs/:id`);
    console.log(`   POST   /api/jobs`);
    console.log(`   PUT    /api/jobs/:id`);
    console.log(`   DELETE /api/jobs/:id`);
    console.log(`   GET    /api/jobs/employer/my-listings`);
    console.log(`   POST   /api/applications/:jobId`);
    console.log(`   GET    /api/applications/my-applications`);
    console.log(`   DELETE /api/applications/:id`);
    console.log(`   GET    /api/applications/job/:jobId`);
    console.log(`   PUT    /api/applications/:id/status`);
  });
}).catch(err => console.error('❌ Failed to sync database:', err));

module.exports = app;
