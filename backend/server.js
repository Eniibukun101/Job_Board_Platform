const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ SQLite Database connected successfully');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Job Board API is running with SQLite',
    timestamp: new Date().toISOString()
  });
});

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database models synced');
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API Health: http://localhost:${PORT}/api/health`);
  });
}).catch(err => {
  console.error('❌ Failed to sync database:', err);
});

module.exports = app;