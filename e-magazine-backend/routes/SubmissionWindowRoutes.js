const express = require("express");

const router = express.Router();

const {
  getSubmissionWindows,
  updateSubmissionWindow,
  getWindowByCategory,
} = require("../controllers/submissionWindowController");

const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roleAuth");

// Main Admin

router.get(
  "/",
  protect,
  getSubmissionWindows
);

router.put(
  "/:category",
  protect,
  authorize("main_admin"),
  updateSubmissionWindow
);

// Students/Admins

router.get(
  "/:category",
  protect,
  getWindowByCategory
);

module.exports = router;