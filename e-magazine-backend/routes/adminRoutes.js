const express = require("express");

const {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
} = require("../controllers/adminController");

const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roleAuth");

const router = express.Router();

router.get(
  "/submissions",
  protect,
  authorize("dept_admin"),
  getPendingSubmissions
);
router.put(
  "/approve/:id",
  protect,
  authorize("dept_admin"),
  approveSubmission
);
router.put(
  "/reject/:id",
  protect,
  authorize("dept_admin"),
  rejectSubmission
);
module.exports = router;
