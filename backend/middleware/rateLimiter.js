/**
 * Job Board Platform - Rate Limiting Middleware
 * Developer: Anjolaoluwa Bawaallah-Olufemi
 * Matric Number: 24120111024
 * 
 * Prevents brute force attacks by limiting requests.
 * Auth routes: max 10 requests per 15 minutes
 * General routes: max 100 requests per 15 minutes
 */

const rateLimit = require('express-rate-limit');

// General API rate limit - applies to all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes
  message: {
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict limit for auth routes (login/register) - prevents brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // only 10 login/register attempts per 15 minutes
  message: {
    message: 'Too many login attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { generalLimiter, authLimiter };
