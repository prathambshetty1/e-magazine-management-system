const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roleAuth");

const {
  assignDepartmentAdmin,
  removeDepartmentAdmin,
  getAllUsers,
  getDashboardStats,
  getAllSubmissions,
  getApprovedSubmissions,
  publishSubmission,
} = require("../controllers/mainAdminController");


router.put(
    "/assign-admin",
    protect,
    authorize("main_admin"),
    assignDepartmentAdmin
);
router.put(
  "/remove-admin",
  protect,
  authorize("main_admin"),
  removeDepartmentAdmin
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
router.get(
  "/approved-submissions",
  protect,
  authorize("main_admin"),
  getApprovedSubmissions
);
router.put(
  "/publish/:id",
  protect,
  authorize("main_admin"),
  publishSubmission
);

module.exports = router;