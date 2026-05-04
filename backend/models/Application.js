const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Job = require('./Job');
const User = require('./User');

// Application Model - represents job applications
const Application = sequelize.define('Application', {
  // Unique identifier for each application
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  // Reference to the Job being applied for
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: 'id'
    }
  },
  
  // Reference to the User (applicant) applying for the job
  applicantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  
  // URL to the applicant's resume/CV
  resumeUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  // Cover letter text from the applicant
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Status of the application (Applied, Reviewed, Shortlisted, Rejected, Accepted)
  status: {
    type: DataTypes.ENUM('Applied', 'Reviewed', 'Shortlisted', 'Rejected', 'Accepted'),
    defaultValue: 'Applied'
  },
  
  // Rating given by employer (0-5 stars)
  rating: {
    type: DataTypes.INTEGER,
    min: 0,
    max: 5,
    allowNull: true
  },
  
  // Feedback from employer
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

module.exports = Application;