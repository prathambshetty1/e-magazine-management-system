const Submission = require("../models/Submission");

// ===============================
// Department Dashboard
// ===============================
const getDashboard = async (req, res) => {
  try {
    const submissions = await Submission.find({
      category: req.user.department,
    }).sort({ createdAt: -1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dashboard = {
      stats: {
        pending: submissions.filter(
          (s) => s.status === "Pending"
        ).length,

        approvedToday: submissions.filter(
          (s) =>
            s.status === "Approved" &&
            s.reviewedAt &&
            new Date(s.reviewedAt) >= today
        ).length,

        rejectedToday: submissions.filter(
          (s) =>
            s.status === "Rejected" &&
            s.reviewedAt &&
            new Date(s.reviewedAt) >= today
        ).length,

        totalReviewed: submissions.filter(
          (s) =>
            s.status === "Approved" ||
            s.status === "Rejected"
        ).length,
      },

      recentPending: submissions
        .filter((s) => s.status === "Pending")
        .slice(0, 5),
    };

    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Pending Submissions
// ===============================
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

// ===============================
// Approve Submission
// ===============================
const approveSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    if (submission.category !== req.user.department) {
      return res.status(403).json({
        message: "Not authorized",
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

// ===============================
// Reject Submission
// ===============================
const rejectSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    if (submission.category !== req.user.department) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    if (!req.body.feedback) {
      return res.status(400).json({
        message: "Feedback is required",
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
  getDashboard,
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
};