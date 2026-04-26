const express = require('express');
const router = express.Router();
const {
  getJobs, getJobById, createJob, updateJob, deleteJob, getMyListings
} = require('../controllers/jobController');
const { protect, restrictTo } = require('../middleware/auth');

// Public
router.get('/', getJobs);
router.get('/:id', getJobById);

// Private - Employer only
router.get('/employer/my-listings', protect, restrictTo('Employer'), getMyListings);
router.post('/', protect, restrictTo('Employer'), createJob);
router.put('/:id', protect, restrictTo('Employer'), updateJob);
router.delete('/:id', protect, restrictTo('Employer'), deleteJob);

module.exports = router;
