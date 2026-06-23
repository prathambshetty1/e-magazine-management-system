const express = require("express");

const {
  createSubmission,
  getMySubmissions,
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
module.exports = router;