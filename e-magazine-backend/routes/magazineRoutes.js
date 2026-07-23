const express = require("express");

const router = express.Router();

const {
  createMagazine,
  getAllMagazines,
  getMagazineById,
  deleteMagazine,
} = require("../controllers/magazineController");

const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roleAuth");

// ==========================
// Public Routes
// ==========================

// Get All Published Magazines
router.get("/", getAllMagazines);

// Get Single Magazine
router.get("/:id", getMagazineById);

// ==========================
// Protected Routes
// ==========================

// Create Magazine
router.post(
  "/",
  protect,
  authorize("main_admin"),
  createMagazine
);

// Delete Magazine
router.delete(
  "/:id",
  protect,
  authorize("main_admin"),
  deleteMagazine
);

module.exports = router;