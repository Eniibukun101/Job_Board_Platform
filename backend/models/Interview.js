const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Interview = sequelize.define(
  "Interview",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    applicationId: { type: DataTypes.INTEGER, allowNull: true },
    company: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    date: { type: DataTypes.STRING, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { timestamps: true },
);

module.exports = Interview;
