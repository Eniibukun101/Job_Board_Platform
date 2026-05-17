const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');

// Employer posts many Jobs
User.hasMany(Job, { foreignKey: 'postedBy', as: 'postedJobs' });
Job.belongsTo(User, { foreignKey: 'postedBy', as: 'employer' });

// Applicant submits many Applications
User.hasMany(Application, { foreignKey: 'applicantId', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'applicantId', as: 'applicant' });

// Job receives many Applications
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

module.exports = { User, Job, Application };
