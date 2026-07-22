const express = require("express");

const {
  createSubmission,
  getStudentDashboard,
  getMySubmissions,
  getSubmissionById,
  updateSubmission,
} = require("../controllers/submissionController");

const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roleAuth");

// Cloudinary Upload Middleware
const upload = require("../middleware/upload");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
*/

// Create Submission
router.post(
  "/",
  protect,
  authorize("student"),
  upload.single("image"),
  createSubmission
);

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("student"),
  getStudentDashboard
);

// My Submissions
router.get(
  "/my",
  protect,
  authorize("student"),
  getMySubmissions
);

// Get Single Submission
router.get(
  "/:id",
  protect,
  authorize("student"),
  getSubmissionById
);

// Update Submission (Pending / Rejected)
router.put(
  "/:id",
  protect,
  authorize("student"),
  upload.single("image"),
  updateSubmission
);

module.exports = router;