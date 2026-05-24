/**
 * Job Board Platform - Authentication Middleware
 * Developer: Anjolaoluwa Bawaallah-Olufemi
 * Matric Number: 24120111024
 * Role: Backend Team - API Routes, Controllers, Middleware & Models
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * protect - Middleware to verify JWT token
 * 
 * This function runs before any protected route handler.
 * It checks if the request has a valid Bearer token in the
 * Authorization header. If valid, it attaches the logged-in
 * user to req.user so controllers can access it.
 * 
 * Usage: router.get('/profile', protect, getProfile)
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Extract the token from "Bearer <token>"
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token found, block the request
  if (!token) {
    return res.status(401).json({ message: 'Not authorized. No token provided.' });
  }

  try {
    // Verify the token using our JWT_SECRET from .env
    // This will throw an error if the token is expired or invalid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database using the ID stored in the token
    // Exclude the password field for security
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    // If user no longer exists in database (e.g. account deleted)
    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    // User is authenticated - pass control to the next middleware/controller
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: 'Not authorized. Invalid token.' });
  }
};

/**
 * restrictTo - Middleware to restrict routes by user type
 * 
 * This function is used AFTER protect middleware.
 * It checks if the logged-in user is the correct type
 * (either 'Applicant' or 'Employer') for the route.
 * 
 * Usage: router.post('/jobs', protect, restrictTo('Employer'), createJob)
 * 
 * @param {...string} userTypes - One or more allowed user types
 * @returns {Function} Express middleware function
 * 
 * Examples:
 * restrictTo('Employer') - only employers can access
 * restrictTo('Applicant') - only applicants can access
 * restrictTo('Employer', 'Applicant') - both can access
 */
const restrictTo = (...userTypes) => {
  return (req, res, next) => {
    // Check if the logged-in user's type is in the allowed types list
    if (!userTypes.includes(req.user.userType)) {
      return res.status(403).json({
        message: `Access denied. Only ${userTypes.join(' or ')} accounts can perform this action.`
      });
    }
    // User has the correct type - pass control to the next middleware/controller
    next();
  };
};

module.exports = { protect, restrictTo };