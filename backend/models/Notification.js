const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notification = sequelize.define(
  "Notification",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: false, defaultValue: "JobNest" },
    message: { type: DataTypes.TEXT, allowNull: false },
    logoType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "spotify",
    },
    isRead: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { timestamps: true },
);

module.exports = Notification;
