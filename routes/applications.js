const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  withdrawApplication
} = require('../controllers/applicationController');
const { protect, restrictTo } = require('../middleware/auth');
const { validateApplication, validateStatusUpdate } = require('../middleware/validate');

// Applicant routes
router.post('/:jobId', protect, restrictTo('Applicant'), validateApplication, applyForJob);
router.get('/my-applications', protect, restrictTo('Applicant'), getMyApplications);
router.delete('/:id', protect, restrictTo('Applicant'), withdrawApplication);

// Employer routes
router.get('/job/:jobId', protect, restrictTo('Employer'), getJobApplications);
router.put('/:id/status', protect, restrictTo('Employer'), validateStatusUpdate, updateApplicationStatus);

module.exports = router;
