    /**
 * Model Associations
 * Developer: 24120111072
 * Description: Define relationships between User, Job, and Application models
 */

const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');

// ─── User Associations ─────────────────────────────────────────────────────
// A User can post many Jobs (as an Employer)
User.hasMany(Job, {
  foreignKey: 'postedBy',
  as: 'postedJobs',
  onDelete: 'CASCADE'
});

// A User can submit many Applications (as an Applicant)
User.hasMany(Application, {
  foreignKey: 'applicantId',
  as: 'applications',
  onDelete: 'CASCADE'
});

// ─── Job Associations ──────────────────────────────────────────────────────
// A Job belongs to one User (the Employer who posted it)
Job.belongsTo(User, {
  foreignKey: 'postedBy',
  as: 'employer'
});

// A Job has many Applications
Job.hasMany(Application, {
  foreignKey: 'jobId',
  as: 'applications',
  onDelete: 'CASCADE'
});

// ─── Application Associations ─────────────────────────────────────────────
// An Application belongs to one User (the Applicant)
Application.belongsTo(User, {
  foreignKey: 'applicantId',
  as: 'applicant'
});

// An Application belongs to one Job
Application.belongsTo(Job, {
  foreignKey: 'jobId',
  as: 'job'
});

// ─── Export Models ────────────────────────────────────────────────────────
module.exports = {
  User,
  Job,
  Application
};