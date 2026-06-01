const express = require("express");
const router = express.Router();
const {
  getMyInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
} = require("../controllers/interviewController");
const { protect, restrictTo } = require("../middleware/auth");

router.get("/", protect, restrictTo("Applicant"), getMyInterviews);
router.post("/", protect, restrictTo("Applicant"), createInterview);
router.put("/:id", protect, restrictTo("Applicant"), updateInterview);
router.delete("/:id", protect, restrictTo("Applicant"), deleteInterview);

module.exports = router;
