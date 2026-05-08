const { Application, Job, User } = require('../models');

// @desc    Apply for a job
// @route   POST /api/applications/:jobId
// @access  Private (Applicant only)
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, resumeUrl } = req.body;

    // Check job exists and is active
    const job = await Job.findByPk(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (!job.isActive) return res.status(400).json({ message: 'This job listing is no longer active.' });

    // Prevent duplicate applications
    const existing = await Application.findOne({
      where: { jobId, applicantId: req.user.id }
    });
    if (existing) {
      return res.status(409).json({ message: 'You have already applied for this job.' });
    }

    const application = await Application.create({
      jobId,
      applicantId: req.user.id,
      coverLetter: coverLetter || null,
      resumeUrl: resumeUrl || null
    });

    res.status(201).json({ message: 'Application submitted successfully.', application });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ message: 'Server error submitting application.' });
  }
};

// @desc    Get all applications submitted by the logged-in applicant
// @route   GET /api/applications/my-applications
// @access  Private (Applicant only)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { applicantId: req.user.id },
      include: [{
        model: Job,
        as: 'job',
        attributes: ['id', 'title', 'company', 'location', 'jobType']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ applications });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({ message: 'Server error fetching applications.' });
  }
};

// @desc    Get all applications for a specific job (employer view)
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer who owns the job)
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (job.postedBy !== req.user.id) {
      return res.status(403).json({ message: 'You can only view applications for your own job listings.' });
    }

    const applications = await Application.findAll({
      where: { jobId },
      include: [{
        model: User,
        as: 'applicant',
        attributes: ['id', 'name', 'email', 'phone', 'bio']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ applications, total: applications.length });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ message: 'Server error fetching applications.' });
  }
};

// @desc    Update application status (employer action)
// @route   PUT /api/applications/:id/status
// @access  Private (Employer who owns the related job)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const application = await Application.findByPk(req.params.id, {
      include: [{ model: Job, as: 'job' }]
    });

    if (!application) return res.status(404).json({ message: 'Application not found.' });
    if (application.job.postedBy !== req.user.id) {
      return res.status(403).json({ message: 'You can only update applications for your own job listings.' });
    }

    application.status = status;
    await application.save();

    res.json({ message: 'Application status updated.', application });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error updating status.' });
  }
};

// @desc    Withdraw/delete an application (applicant action)
// @route   DELETE /api/applications/:id
// @access  Private (Applicant who submitted the application)
const withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);

    if (!application) return res.status(404).json({ message: 'Application not found.' });
    if (application.applicantId !== req.user.id) {
      return res.status(403).json({ message: 'You can only withdraw your own applications.' });
    }

    await application.destroy();

    res.json({ message: 'Application withdrawn successfully.' });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res.status(500).json({ message: 'Server error withdrawing application.' });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  withdrawApplication
};
