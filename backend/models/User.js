const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: {
      type: DataTypes.ENUM("Applicant", "Employer"),
      defaultValue: "Applicant",
    },
    company: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    industry: { type: DataTypes.STRING, allowNull: true },
    website: { type: DataTypes.STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: true },
    qualification: { type: DataTypes.STRING, allowNull: true },
    expectedSalaryRange: { type: DataTypes.STRING, allowNull: true },
    preferredJobType: { type: DataTypes.STRING, allowNull: true },
    photoUrl: { type: DataTypes.TEXT, allowNull: true },
    resumeUrl: { type: DataTypes.TEXT, allowNull: true },
    linkedin: { type: DataTypes.STRING, allowNull: true },
    portfolio: { type: DataTypes.STRING, allowNull: true },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "[]",
      get() {
        const value = this.getDataValue("skills");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("skills", JSON.stringify(value || []));
      },
    },
    experiences: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "[]",
      get() {
        const value = this.getDataValue("experiences");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("experiences", JSON.stringify(value || []));
      },
    },
    savedJobIds: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "[]",
      get() {
        const value = this.getDataValue("savedJobIds");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("savedJobIds", JSON.stringify(value || []));
      },
    },
  },
  { timestamps: true },
);

module.exports = User;
