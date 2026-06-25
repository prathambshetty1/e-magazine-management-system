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
const updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    
    if (submission.student.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    
    if (submission.status !== "Rejected") {
      return res.status(400).json({
        message: "Only rejected submissions can be edited",
      });
    }

    submission.title = req.body.title;
    submission.description = req.body.description;
    submission.category = req.body.category;

    
    submission.status = "Pending";
    submission.feedback = "";

    await submission.save();

    res.status(200).json({
      message: "Submission updated and resubmitted",
      submission,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    createSubmission,
    getMySubmissions,
    updateSubmission
};