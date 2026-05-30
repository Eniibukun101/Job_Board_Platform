/**
 * Job Board Platform - Passport Google OAuth Middleware
 * Developer: Anjolaoluwa Bawaallah-Olufemi
 * Matric Number: 24120111024
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ where: { email: profile.emails[0].value } });

    if (user) {
      // User exists — just return them
      return done(null, user);
    }

    // Create new user from Google profile
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: 'google-oauth-' + profile.id,
      userType: 'Applicant'
    });

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;