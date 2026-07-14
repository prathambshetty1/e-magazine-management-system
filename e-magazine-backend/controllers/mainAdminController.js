const User = require("../models/User");
const Submission = require("../models/Submission");
const bcrypt = require("bcryptjs");
const categories = require("../config/categories");

// Promote Student to Department Admin

const assignDepartmentAdmin = async (req, res) => {
  try {
    const { usn, department } = req.body;
    if (!categories.includes(department)) {
  return res.status(400).json({
    message: "Invalid department",
  });
}

    const student = await User.findOne({ usn });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (student.role === "main_admin") {
  return res.status(400).json({
    message: "Main Admin cannot be assigned as Department Admin",
  });
}

if (student.role === "dept_admin") {
  return res.status(400).json({
    message: `Student is already assigned to ${student.department}`,
  });
}

    student.role = "dept_admin";
    student.department = department;

    await student.save();

    res.status(200).json({
      message: "Department Admin assigned successfully",
      student,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Remove Department Admin
const removeDepartmentAdmin = async (req, res) => {
  try {
    const { usn } = req.body;

    const admin = await User.findOne({ usn });

    if (!admin) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (admin.role !== "dept_admin") {
      return res.status(400).json({
        message: "Student is not a Department Admin",
      });
    }

    admin.role = "student";
    admin.department = null;

    await admin.save();

    res.status(200).json({
      message: "Department Admin removed successfully",
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
// Get Approved Submissions
const getApprovedSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      status: "Approved",
    })
      .populate("student", "name usn email")
      .sort({ createdAt: -1 });

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
  assignDepartmentAdmin,
  removeDepartmentAdmin,
  getAllUsers,
  getDashboardStats,
  getAllSubmissions,
  getApprovedSubmissions,
  publishSubmission,
};