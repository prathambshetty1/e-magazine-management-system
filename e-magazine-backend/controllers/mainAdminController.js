const User = require("../models/User");
const Submission = require("../models/Submission");
const bcrypt = require("bcryptjs");

const createCategoryAdmin = async (req, res) => {
  try {
    const { name, usn, email, password, department } = req.body;

    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const admin = await User.create({
      name,
      usn,
      email,
      password: hashedPassword,
      role: "dept_admin",
      department,
    });

    res.status(201).json({
      message: "Category Admin created successfully",
      admin,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// View All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalCategoryAdmins = await User.countDocuments({
      role: "dept_admin",
    });

    const pendingArticles = await Submission.countDocuments({
      status: "Pending",
    });

    const approvedArticles = await Submission.countDocuments({
      status: "Approved",
    });

    const rejectedArticles = await Submission.countDocuments({
      status: "Rejected",
    });

    const publishedArticles = await Submission.countDocuments({
      status: "Published",
    });

    res.status(200).json({
      totalStudents,
      totalCategoryAdmins,
      pendingArticles,
      approvedArticles,
      rejectedArticles,
      publishedArticles,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// View All Submissions
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("student", "name usn email")
      .populate("reviewedBy", "name email");

    res.status(200).json(submissions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Publish Approved Article
const publishSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    if (submission.status !== "Approved") {
      return res.status(400).json({
        message: "Only approved articles can be published",
      });
    }

    submission.status = "Published";

    await submission.save();

    res.status(200).json({
      message: "Article published successfully",
      submission,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCategoryAdmin,
  getAllUsers,
  getDashboardStats,
  getAllSubmissions,
  publishSubmission,
};