const express = require('express');
const router = express.Router();
const {
  getJobs, getJobById, createJob, updateJob, deleteJob, getMyListings
} = require('../controllers/jobController');
const { protect, restrictTo } = require('../middleware/auth');
const { validateCreateJob, validateUpdateJob } = require('../middleware/validate');

// Public
router.get('/', getJobs);
router.get('/employer/my-listings', protect, restrictTo('Employer'), getMyListings);
router.get('/:id', getJobById);

// Private - Employer only
router.post('/', protect, restrictTo('Employer'), validateCreateJob, createJob);
router.put('/:id', protect, restrictTo('Employer'), validateUpdateJob, updateJob);
router.delete('/:id', protect, restrictTo('Employer'), deleteJob);

module.exports = router;
