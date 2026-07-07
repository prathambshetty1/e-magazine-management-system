const express = require("express");

const {
  createSubmission,
  getStudentDashboard,
  getMySubmissions,
  updateSubmission,
} = require("../controllers/submissionController");

const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roleAuth");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("student"),
  createSubmission
);

router.get(
  "/my",
  protect,
  authorize("student"),
  getMySubmissions
);
router.put(
    "/:id",
    protect,
    authorize("student"),
    updateSubmission
);
router.get(
  "/dashboard",
  protect,
  authorize("student"),
  getStudentDashboard
);
module.exports = router;