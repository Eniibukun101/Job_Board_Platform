/**
 * Job Board Platform - Backend API
 * Developer: Anjolaoluwa Bawaallah-Olufemi
 * Matric Number: 24120111024
 * Role: Backend Team - Jobs Controller
 */

const { Op } = require("sequelize");
const { Job, User, Application } = require("../models");

// @desc    Get all active jobs (with optional search & filters)
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      experience,
      salaryMin,
      page = 1,
      limit = 10,
    } = req.query;

    const where = { isActive: true };

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (location) where.location = { [Op.like]: `%${location}%` };
    if (jobType) where.jobType = jobType;
    if (experience) where.experience = experience;
    if (salaryMin) where.salaryMin = { [Op.gte]: parseInt(salaryMin) };

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: jobs } = await Job.findAndCountAll({
      where,
      include: [
        { model: User, as: "employer", attributes: ["id", "name", "company"] },
        {
          model: Application,
          as: "applications",
          attributes: ["id", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      jobs,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ message: "Server error fetching jobs." });
  }
};

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "employer",
          attributes: ["id", "name", "company", "email"],
        },
        {
          model: Application,
          as: "applications",
          attributes: ["id", "status"],
        },
      ],
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.json({ job });
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({ message: "Server error fetching job." });
  }
};

// @desc    Create a new job listing
// @route   POST /api/jobs
// @access  Private (Employer only)
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      category,
      location,
      salaryMin,
      salaryMax,
      jobType,
      experience,
      skills,
    } = req.body;

    if (!title || !description || !company || !location) {
      return res.status(400).json({
        message: "Title, description, company, and location are required.",
      });
    }

    const job = await Job.create({
      title,
      description,
      company,
      category: category || "developer-software",
      location,
      salaryMin: salaryMin || null,
      salaryMax: salaryMax || null,
      jobType: jobType || "Full-time",
      experience: experience || "Mid",
      skills: skills || [],
      postedBy: req.user.id,
    });

    res.status(201).json({ message: "Job posted successfully.", job });
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ message: "Server error creating job." });
  }
};

// @desc    Update a job listing
// @route   PUT /api/jobs/:id
// @access  Private (Employer who posted the job)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    if (job.postedBy !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own job listings." });
    }

    const fields = [
      "title",
      "description",
      "company",
      "category",
      "location",
      "salaryMin",
      "salaryMax",
      "jobType",
      "experience",
      "skills",
      "isActive",
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) job[field] = req.body[field];
    });

    await job.save();

    res.json({ message: "Job updated successfully.", job });
  } catch (error) {
    console.error("Update job error:", error);
    res.status(500).json({ message: "Server error updating job." });
  }
};

// @desc    Delete a job listing
// @route   DELETE /api/jobs/:id
// @access  Private (Employer who posted the job)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    if (job.postedBy !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own job listings." });
    }

    await job.destroy();

    res.json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ message: "Server error deleting job." });
  }
};

// @desc    Get all jobs posted by the logged-in employer
// @route   GET /api/jobs/my-listings
// @access  Private (Employer only)
const getMyListings = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { postedBy: req.user.id },
      include: [
        {
          model: Application,
          as: "applications",
          attributes: ["id", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ jobs });
  } catch (error) {
    console.error("Get my listings error:", error);
    res.status(500).json({ message: "Server error fetching your listings." });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const savedJobIds = user.savedJobIds || [];

    if (savedJobIds.length === 0) {
      return res.json({ jobs: [] });
    }

    const jobs = await Job.findAll({
      where: { id: savedJobIds, isActive: true },
      include: [
        {
          model: Application,
          as: "applications",
          attributes: ["id", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ jobs });
  } catch (error) {
    console.error("Get saved jobs error:", error);
    res.status(500).json({ message: "Server error fetching saved jobs." });
  }
};

const saveJob = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const job = await Job.findByPk(req.params.id);

    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found." });
    }

    const savedJobIds = user.savedJobIds || [];
    const jobId = Number(req.params.id);
    if (!savedJobIds.includes(jobId)) {
      user.savedJobIds = [...savedJobIds, jobId];
      await user.save();
    }

    res.json({
      message: "Job saved successfully.",
      savedJobIds: user.savedJobIds,
    });
  } catch (error) {
    console.error("Save job error:", error);
    res.status(500).json({ message: "Server error saving job." });
  }
};

const unsaveJob = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    user.savedJobIds = (user.savedJobIds || []).filter(
      (jobId) => jobId !== Number(req.params.id),
    );
    await user.save();

    res.json({
      message: "Job removed from saved list.",
      savedJobIds: user.savedJobIds,
    });
  } catch (error) {
    console.error("Unsave job error:", error);
    res.status(500).json({ message: "Server error removing saved job." });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyListings,
  getSavedJobs,
  saveJob,
  unsaveJob,
};
