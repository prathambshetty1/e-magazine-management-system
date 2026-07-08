const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ======================================
// Load Environment Variables FIRST
// ======================================
dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mainAdminRoutes = require("./routes/mainAdminRoutes");

// Middleware
const { protect } = require("./middleware/auth");
const { authorize } = require("./middleware/roleAuth");

// ======================================
// Connect Database
// ======================================
connectDB();

const app = express();

// ======================================
// Middleware
// ======================================
app.use(cors());
app.use(express.json());

// ======================================
// Routes
// ======================================
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/main-admin", mainAdminRoutes);

// ======================================
// Test Route
// ======================================
app.get("/", (req, res) => {
  res.send("E-Magazine Backend Running");
});

// ======================================
// Protected Profile Route
// ======================================
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});

// ======================================
// Student Route
// ======================================
app.get(
  "/api/student",
  protect,
  authorize("student"),
  (req, res) => {
    res.json({
      message: "Student Route Accessed",
    });
  }
);

// ======================================
// Main Admin Route
// ======================================
app.get(
  "/api/main-admin",
  protect,
  authorize("main_admin"),
  (req, res) => {
    res.json({
      message: "Main Admin Route Accessed",
    });
  }
);

// ======================================
// Start Server
// ======================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});