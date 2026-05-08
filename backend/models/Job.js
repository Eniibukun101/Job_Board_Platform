const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  salaryMin: { type: DataTypes.INTEGER, allowNull: true },
  salaryMax: { type: DataTypes.INTEGER, allowNull: true },
  jobType: { type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship'), defaultValue: 'Full-time' },
  experience: { type: DataTypes.ENUM('Entry', 'Mid', 'Senior'), defaultValue: 'Mid' },
  skills: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() { const val = this.getDataValue('skills'); return val ? JSON.parse(val) : []; },
    set(val) { this.setDataValue('skills', JSON.stringify(val)); }
  },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  postedBy: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

module.exports = Job;