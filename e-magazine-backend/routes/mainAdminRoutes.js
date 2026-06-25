const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roleAuth");

const {
  createCategoryAdmin,
  getAllUsers,
  getDashboardStats,
  getAllSubmissions,
  publishSubmission,
} = require("../controllers/mainAdminController");

router.post(
  "/create-admin",
  protect,
  authorize("main_admin"),
  createCategoryAdmin
);
router.get(
  "/users",
  protect,
  authorize("main_admin"),
  getAllUsers
);
router.get(
  "/dashboard",
  protect,
  authorize("main_admin"),
  getDashboardStats
);
router.get(
  "/submissions",
  protect,
  authorize("main_admin"),
  getAllSubmissions
);
router.put(
  "/publish/:id",
  protect,
  authorize("main_admin"),
  publishSubmission
);

module.exports = router;