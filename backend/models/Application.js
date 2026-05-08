const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Application Model - represents job applications
const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  applicantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  resumeUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Status values: Pending, Reviewed, Shortlisted, Rejected, Hired
  status: {
    type: DataTypes.ENUM('Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'),
    defaultValue: 'Pending'
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Application;