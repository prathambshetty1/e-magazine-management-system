const Submission = require("../models/Submission");

const getPendingSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      category: req.user.department,
      status: "Pending",
    }).populate("student", "name usn email");

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(
      req.params.id
    );

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }
    if (submission.category !== req.user.department) {
        return res.status(403).json({
            message: "Not authorized"
        });
    }
    submission.status = "Approved";
    submission.reviewedBy = req.user.id;
    submission.reviewedAt = new Date();

    await submission.save();

    res.status(200).json({
      message: "Submission approved",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(
      req.params.id
    );

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }
    if (submission.category !== req.user.department) {
        return res.status(403).json({
            message: "Not authorized"
        });
    }
    if (!req.body.feedback) {
  return res.status(400).json({
    message: "Feedback is required when rejecting a submission",
  });
}
    submission.status = "Rejected";
    submission.feedback = req.body.feedback;
    submission.reviewedBy = req.user.id;
    submission.reviewedAt = new Date();

    await submission.save();

    res.status(200).json({
      message: "Submission rejected",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
};