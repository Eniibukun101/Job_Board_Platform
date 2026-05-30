const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resumeUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'),
    defaultValue: 'Pending'
  }
}, { timestamps: true });

module.exports = Application;
