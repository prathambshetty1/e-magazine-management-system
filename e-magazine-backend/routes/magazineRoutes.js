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

// Create Magazine
router.post(
  "/",
  protect,
  authorize("main_admin"),
  createMagazine
);

// Get All Magazines
router.get(
  "/",
  protect,
  authorize("main_admin"),
  getAllMagazines
);

// Get Single Magazine
router.get(
  "/:id",
  protect,
  authorize("main_admin"),
  getMagazineById
);

// Delete Magazine
router.delete(
  "/:id",
  protect,
  authorize("main_admin"),
  deleteMagazine
);

module.exports = router;