const User = require("./User");
const Job = require("./Job");
const Application = require("./Application");
const Notification = require("./Notification");
const Interview = require("./Interview");

// Employer posts many Jobs
User.hasMany(Job, { foreignKey: "postedBy", as: "postedJobs" });
Job.belongsTo(User, { foreignKey: "postedBy", as: "employer" });

// Applicant submits many Applications
User.hasMany(Application, { foreignKey: "applicantId", as: "applications" });
Application.belongsTo(User, { foreignKey: "applicantId", as: "applicant" });

// Job receives many Applications
Job.hasMany(Application, { foreignKey: "jobId", as: "applications" });
Application.belongsTo(Job, { foreignKey: "jobId", as: "job" });

// User receives many Notifications
User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

// User has many Interviews
User.hasMany(Interview, { foreignKey: "userId", as: "interviews" });
Interview.belongsTo(User, { foreignKey: "userId", as: "user" });

// Application may create an Interview
Application.hasMany(Interview, {
  foreignKey: "applicationId",
  as: "interviews",
});
Interview.belongsTo(Application, {
  foreignKey: "applicationId",
  as: "application",
});

module.exports = { User, Job, Application, Notification, Interview };
