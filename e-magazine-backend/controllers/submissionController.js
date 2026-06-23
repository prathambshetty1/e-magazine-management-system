const Submission = require("../models/Submission");

const createSubmission = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const submission = await Submission.create({
      title,
      description,
      category,
      student: req.user.id,
    });

    res.status(201).json({
      message: "Article submitted successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      student: req.user.id,
    });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSubmission,
  getMySubmissions,
};