const express = require("express");

const {
  createSubmission,
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

module.exports = router;