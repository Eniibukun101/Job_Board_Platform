/**
 * Job Board Platform - Backend API
 * Developer: Anjolaoluwa Bawaallah-Olufemi
 * Matric Number: 24120111024
 * Role: Backend Team - Authentication Controller
 */

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const GOOGLE_REDIRECT_URI =
  process.env.GOOGLE_REDIRECT_URI ||
  "http://localhost:5000/api/auth/google/callback";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const serializeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  userType: user.userType,
  company: user.company,
  phone: user.phone,
  bio: user.bio,
  industry: user.industry,
  website: user.website,
  location: user.location,
  role: user.role,
  qualification: user.qualification,
  expectedSalaryRange: user.expectedSalaryRange,
  preferredJobType: user.preferredJobType,
});

const isGoogleConfigured = () => {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.JWT_SECRET,
  );
};

const buildFrontendCallbackUrl = (params = {}) => {
  const url = new URL("/auth/google/callback", FRONTEND_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

const redirectToFrontendError = (res, message) => {
  return res.redirect(buildFrontendCallbackUrl({ error: message }));
};

const exchangeGoogleCodeForTokens = async (code) => {
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    throw new Error(
      tokenData.error_description ||
        tokenData.error ||
        "Failed to exchange Google authorization code.",
    );
  }

  return tokenData;
};

const fetchGoogleUser = async (accessToken) => {
  const profileResponse = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const profileData = await profileResponse.json();

  if (!profileResponse.ok) {
    throw new Error(
      profileData.error_description ||
        profileData.error ||
        "Failed to fetch Google profile.",
    );
  }

  return profileData;
};

const register = async (req, res) => {
  try {
    const { name, email, password, userType, company, phone, bio } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    if (userType === "Employer" && !company) {
      return res
        .status(400)
        .json({ message: "Company name is required for Employer accounts." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType: userType || "Applicant",
      company: company || null,
      phone: phone || null,
      bio: bio || null,
    });

    const token = generateToken(user.id);

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user.id);

    res.json({
      message: "Login successful.",
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

const googleAuthStart = async (req, res) => {
  try {
    if (!isGoogleConfigured()) {
      return redirectToFrontendError(
        res,
        "Google authentication is not configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in backend/.env.",
      );
    }

    const mode = req.query.mode === "Employer" ? "Employer" : "Applicant";
    const state = jwt.sign({ mode }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleUrl.search = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      prompt: "select_account",
      access_type: "offline",
      state,
    }).toString();

    return res.redirect(googleUrl.toString());
  } catch (error) {
    console.error("Google auth start error:", error);
    return redirectToFrontendError(
      res,
      "Unable to start Google authentication.",
    );
  }
};

const googleAuthCallback = async (req, res) => {
  try {
    if (!isGoogleConfigured()) {
      return redirectToFrontendError(
        res,
        "Google authentication is not configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in backend/.env.",
      );
    }

    const { code, state } = req.query;

    if (!code || !state) {
      return redirectToFrontendError(
        res,
        "Google authentication was cancelled or did not return the required data.",
      );
    }

    const decodedState = jwt.verify(state, process.env.JWT_SECRET);
    const mode = decodedState.mode === "Employer" ? "Employer" : "Applicant";

    const tokens = await exchangeGoogleCodeForTokens(code);
    const googleUser = await fetchGoogleUser(tokens.access_token);

    if (!googleUser.email) {
      return redirectToFrontendError(
        res,
        "Your Google account did not return an email address.",
      );
    }

    let user = await User.findOne({ where: { email: googleUser.email } });

    if (user && user.userType !== mode) {
      return redirectToFrontendError(
        res,
        mode === "Employer"
          ? "This Google account is already linked to an applicant profile."
          : "This Google account is already linked to an employer profile.",
      );
    }

    if (!user) {
      const randomPassword = crypto.randomBytes(24).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 12);
      const displayName =
        googleUser.name ||
        googleUser.given_name ||
        googleUser.email.split("@")[0];

      user = await User.create({
        name: displayName,
        email: googleUser.email,
        password: hashedPassword,
        userType: mode,
        company: mode === "Employer" ? displayName : null,
      });
    }

    const token = generateToken(user.id);

    return res.redirect(
      buildFrontendCallbackUrl({
        token,
        user: encodeURIComponent(JSON.stringify(serializeUser(user))),
      }),
    );
  } catch (error) {
    console.error("Google auth callback error:", error);
    return redirectToFrontendError(
      res,
      error.message || "Google authentication failed.",
    );
  }
};

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

const updateMe = async (req, res) => {
  try {
    const {
      name,
      phone,
      bio,
      company,
      industry,
      website,
      location,
      role,
      qualification,
      expectedSalaryRange,
      preferredJobType,
    } = req.body;

    const user = await User.findByPk(req.user.id);
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    if (company !== undefined) user.company = company;
    if (industry !== undefined) user.industry = industry;
    if (website !== undefined) user.website = website;
    if (location !== undefined) user.location = location;
    if (role !== undefined) user.role = role;
    if (qualification !== undefined) user.qualification = qualification;
    if (expectedSalaryRange !== undefined)
      user.expectedSalaryRange = expectedSalaryRange;
    if (preferredJobType !== undefined)
      user.preferredJobType = preferredJobType;

    await user.save();

    res.json({
      message: "Profile updated successfully.",
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error updating profile." });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required." });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters." });
    }

    const user = await User.findByPk(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error changing password." });
  }
};

module.exports = {
  register,
  login,
  googleAuthStart,
  googleAuthCallback,
  getMe,
  updateMe,
  changePassword,
};
