const SubmissionWindow = require("../models/SubmissionWindow");
const categories = require("../config/categories");

// ======================================
// Get All Submission Windows
// ======================================

const getSubmissionWindows = async (req, res) => {
  try {
    const windows = await SubmissionWindow.find();

    const now = new Date();

    const result = categories.map((category) => {
      const existing = windows.find(
        (window) => window.category === category
      );

      if (!existing) {
        return {
          category,
          configured: false,
          openDate: null,
          closeDate: null,
          isOpen: false,
        };
      }

      const hasOpened =
        now >= existing.openDate;

      const hasClosed =
        now > existing.closeDate;

      const daysRemaining = Math.max(
        0,
        Math.ceil(
          (existing.closeDate - now) /
            (1000 * 60 * 60 * 24)
        )
      );

      return {
        ...existing.toObject(),
        configured: true,
        hasOpened,
        hasClosed,
        isOpen:
          hasOpened && !hasClosed,
        daysRemaining,
      };
    });

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Update/Create Submission Window
// ======================================

const updateSubmissionWindow = async (req, res) => {
  try {
    const { category } = req.params;

    const {
      openDate,
      closeDate,
    } = req.body;

    if (!categories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category",
      });
    }

    if (
      !openDate ||
      !closeDate
    ) {
      return res.status(400).json({
        message: "Open and Close dates are required.",
      });
    }

    if (
      new Date(openDate) >=
      new Date(closeDate)
    ) {
      return res.status(400).json({
        message:
          "Close date must be after open date.",
      });
    }

    const window =
      await SubmissionWindow.findOneAndUpdate(
        { category },
        {
          openDate,
          closeDate,
        },
        {
          upsert: true,
          new: true,
        }
      );

    res.status(200).json({
      message:
        "Submission window updated successfully.",
      window,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Get Window By Category
// ======================================

const getWindowByCategory = async (
  req,
  res
) => {
  try {
    const window =
      await SubmissionWindow.findOne({
        category: req.params.category,
      });

    if (!window) {
      return res.status(404).json({
        message:
          "Submission window not found.",
      });
    }

    const now = new Date();

    const isOpen =
      now >= window.openDate &&
      now <= window.closeDate;

    res.status(200).json({
      ...window.toObject(),
      isOpen,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSubmissionWindows,
  updateSubmissionWindow,
  getWindowByCategory,
};