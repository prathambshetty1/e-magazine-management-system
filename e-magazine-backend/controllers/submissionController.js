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
      image,
      tags,
      category,
      isDraft,
    } = req.body;

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

    if (submission.status !== "Rejected") {
      return res.status(400).json({
        message: "Only rejected submissions can be edited",
      });
    }

    submission.title =
      req.body.title || submission.title;

    submission.description =
      req.body.description ??
      submission.description;

    submission.image =
      req.body.image ??
      submission.image;

    submission.tags =
      req.body.tags ??
      submission.tags;

    submission.category =
      req.body.category ||
      submission.category;

    submission.status = "Pending";
    submission.feedback = "";
    submission.reviewedBy = null;
    submission.reviewedAt = null;

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
  updateSubmission,
};