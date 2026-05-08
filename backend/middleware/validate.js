const { body, validationResult } = require('express-validator');

// Reusable function - checks for validation errors and returns them
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// ─── Auth Validators ──────────────────────────────────────────────────────────

const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number'),

  body('userType')
    .optional()
    .isIn(['Applicant', 'Employer']).withMessage('User type must be Applicant or Employer'),

  body('company')
    .if(body('userType').equals('Employer'))
    .notEmpty().withMessage('Company name is required for Employer accounts'),

  handleValidationErrors
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty().withMessage('Password is required'),

  handleValidationErrors
];

const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  body('phone')
    .optional()
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage('Please provide a valid phone number'),

  body('bio')
    .optional()
    .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),

  handleValidationErrors
];

const validateChangePassword = [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),

  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
    .matches(/\d/).withMessage('New password must contain at least one number'),

  handleValidationErrors
];

// ─── Job Validators ───────────────────────────────────────────────────────────

const validateCreateJob = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Job description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),

  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required'),

  body('location')
    .trim()
    .notEmpty().withMessage('Location is required'),

  body('jobType')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
    .withMessage('Job type must be Full-time, Part-time, Contract, or Internship'),

  body('experience')
    .optional()
    .isIn(['Entry', 'Mid', 'Senior'])
    .withMessage('Experience must be Entry, Mid, or Senior'),

  body('salaryMin')
    .optional()
    .isInt({ min: 0 }).withMessage('Minimum salary must be a positive number'),

  body('salaryMax')
    .optional()
    .isInt({ min: 0 }).withMessage('Maximum salary must be a positive number')
    .custom((value, { req }) => {
      if (req.body.salaryMin && value < req.body.salaryMin) {
        throw new Error('Maximum salary must be greater than minimum salary');
      }
      return true;
    }),

  body('skills')
    .optional()
    .isArray().withMessage('Skills must be an array'),

  handleValidationErrors
];

const validateUpdateJob = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),

  body('jobType')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
    .withMessage('Invalid job type'),

  body('experience')
    .optional()
    .isIn(['Entry', 'Mid', 'Senior'])
    .withMessage('Invalid experience level'),

  handleValidationErrors
];

// ─── Application Validators ───────────────────────────────────────────────────

const validateApplication = [
  body('coverLetter')
    .optional()
    .isLength({ max: 1000 }).withMessage('Cover letter cannot exceed 1000 characters'),

  body('resumeUrl')
    .optional()
    .isURL().withMessage('Resume URL must be a valid URL'),

  handleValidationErrors
];

const validateStatusUpdate = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'])
    .withMessage('Status must be: Pending, Reviewed, Shortlisted, Rejected, or Hired'),

  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateCreateJob,
  validateUpdateJob,
  validateApplication,
  validateStatusUpdate
};
