const Magazine = require("../models/Magazine");
const Submission = require("../models/Submission");

// ==========================
// Create Magazine
// ==========================

const createMagazine = async (req, res) => {
  try {
    const {
      title,
      edition,
      description,
      submissions,
    } = req.body;

    if (!title || !edition) {
      return res.status(400).json({
        message: "Title and edition are required.",
      });
    }

    if (!submissions || submissions.length === 0) {
      return res.status(400).json({
        message: "Select at least one submission.",
      });
    }

    const approvedSubmissions = await Submission.find({
      _id: { $in: submissions },
      status: "Approved",
    });

    if (approvedSubmissions.length !== submissions.length) {
      return res.status(400).json({
        message: "Only approved submissions can be published.",
      });
    }

    const magazine = await Magazine.create({
      title,
      edition,
      description,
      submissions,
    });

    await Submission.updateMany(
      {
        _id: { $in: submissions },
      },
      {
        status: "Published",
      }
    );

    res.status(201).json({
      message: "Magazine published successfully.",
      magazine,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ==========================
// Get All Magazines
// ==========================

const getAllMagazines = async (req, res) => {
  try {

    const magazines = await Magazine.find()
      .sort({ createdAt: -1 });

    res.status(200).json(magazines);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ==========================
// Get Single Magazine
// ==========================

const getMagazineById = async (req, res) => {
  try {

    const magazine = await Magazine.findById(req.params.id)
      .populate({
        path: "submissions",
        populate: {
          path: "student",
          select: "name usn",
        },
      });

    if (!magazine) {
      return res.status(404).json({
        message: "Magazine not found.",
      });
    }

    res.status(200).json(magazine);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ==========================
// Delete Magazine
// ==========================

const deleteMagazine = async (req, res) => {
  try {

    const magazine = await Magazine.findById(req.params.id);

    if (!magazine) {
      return res.status(404).json({
        message: "Magazine not found.",
      });
    }

    await Submission.updateMany(
      {
        _id: {
          $in: magazine.submissions,
        },
      },
      {
        status: "Approved",
      }
    );

    await magazine.deleteOne();

    res.status(200).json({
      message: "Magazine deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createMagazine,
  getAllMagazines,
  getMagazineById,
  deleteMagazine,
};