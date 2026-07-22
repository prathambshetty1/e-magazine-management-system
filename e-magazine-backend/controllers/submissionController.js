const Submission = require("../models/Submission");
const categories = require("../config/categories");

// ==========================
// Create Submission
// ==========================
const createSubmission = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      isDraft,
    } = req.body;

    const image = req.file ? req.file.path : "";

    let tags = [];

    if (req.body.tags) {
      try {
        tags = JSON.parse(req.body.tags);
      } catch (err) {
        tags = [];
      }
    }

    if (!categories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category",
      });
    }

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const isImageSubmission =
      category === "Photography" ||
      category === "Paintings";

    if (isImageSubmission) {
      if (!image) {
        return res.status(400).json({
          message: "Image is required",
        });
      }
    } else {
      if (!description || description.trim() === "") {
        return res.status(400).json({
          message: "Content is required",
        });
      }
    }

    const submission = await Submission.create({
      title,
      description: description || "",
      image: image || "",
      tags: tags || [],
      category,
      isDraft: isDraft || false,
      student: req.user.id,
    });

    res.status(201).json({
      message: "Submission created successfully",
      submission,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Student Dashboard
// ==========================
const getStudentDashboard = async (req, res) => {
  try {
    const submissions = await Submission.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    const dashboard = {
      stats: {
        total: submissions.length,
        pending: submissions.filter(
          (s) => s.status === "Pending"
        ).length,

        approved: submissions.filter(
          (s) => s.status === "Approved"
        ).length,

        rejected: submissions.filter(
          (s) => s.status === "Rejected"
        ).length,

        published: submissions.filter(
          (s) => s.status === "Published"
        ).length,
      },

      recent: submissions.slice(0, 5),
    };

    res.status(200).json(dashboard);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// My Submissions
// ==========================
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      student: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(submissions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Single Submission
// ==========================
const getSubmissionById = async (req, res) => {
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

    res.status(200).json(submission);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Submission
// ==========================
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

    if (
      submission.status !== "Pending" &&
      submission.status !== "Rejected"
    ) {
      return res.status(400).json({
        message:
          "Cannot be edited. This submission has already been reviewed.",
      });
    }

    const {
  title,
  description,
} = req.body;

// Keep the original category from the database.
// Students are not allowed to change it.
const category = submission.category;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    let tags = submission.tags;

    if (req.body.tags) {
      try {
        tags = JSON.parse(req.body.tags);
      } catch (err) {
        tags = [];
      }
    }

    const isImageSubmission =
      category === "Photography" ||
      category === "Paintings";

    if (isImageSubmission) {

      if (req.file) {
        submission.image = req.file.path;
      }

      if (!submission.image) {
        return res.status(400).json({
          message: "Image is required",
        });
      }

      submission.description = "";

    } else {

      if (!description || description.trim() === "") {
        return res.status(400).json({
          message: "Content is required",
        });
      }

      submission.description = description;
    }

    submission.title = title;
    submission.category = category;
    submission.tags = tags;

    if (submission.status === "Rejected") {
      submission.status = "Pending";
      submission.feedback = "";
      submission.reviewedBy = null;
      submission.reviewedAt = null;
    }

    await submission.save();

    res.status(200).json({
      message: "Submission updated successfully",
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
  getStudentDashboard,
  getMySubmissions,
  getSubmissionById,
  updateSubmission,
};