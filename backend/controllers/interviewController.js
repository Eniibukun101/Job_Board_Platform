const { Interview } = require("../models");

const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.findAll({
      where: { userId: req.user.id },
      order: [["date", "ASC"], ["time", "ASC"]],
    });

    res.json({ interviews });
  } catch (error) {
    console.error("Get interviews error:", error);
    res.status(500).json({ message: "Server error fetching interviews." });
  }
};

const createInterview = async (req, res) => {
  try {
    const { company, title, description, date, time } = req.body;

    if (!company || !title || !date || !time) {
      return res.status(400).json({
        message: "Company, title, date, and time are required.",
      });
    }

    const interview = await Interview.create({
      userId: req.user.id,
      company,
      title,
      description: description || null,
      date,
      time,
      completed: false,
    });

    res.status(201).json({ message: "Interview created successfully.", interview });
  } catch (error) {
    console.error("Create interview error:", error);
    res.status(500).json({ message: "Server error creating interview." });
  }
};

const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByPk(req.params.id);

    if (!interview || interview.userId !== req.user.id) {
      return res.status(404).json({ message: "Interview not found." });
    }

    const { company, title, description, date, time, completed } = req.body;

    if (company !== undefined) interview.company = company;
    if (title !== undefined) interview.title = title;
    if (description !== undefined) interview.description = description;
    if (date !== undefined) interview.date = date;
    if (time !== undefined) interview.time = time;
    if (completed !== undefined) interview.completed = completed;

    await interview.save();

    res.json({ message: "Interview updated successfully.", interview });
  } catch (error) {
    console.error("Update interview error:", error);
    res.status(500).json({ message: "Server error updating interview." });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByPk(req.params.id);

    if (!interview || interview.userId !== req.user.id) {
      return res.status(404).json({ message: "Interview not found." });
    }

    await interview.destroy();

    res.json({ message: "Interview deleted successfully." });
  } catch (error) {
    console.error("Delete interview error:", error);
    res.status(500).json({ message: "Server error deleting interview." });
  }
};

module.exports = {
  getMyInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
};
