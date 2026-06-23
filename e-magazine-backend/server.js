const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/auth");
const { authorize } = require("./middleware/roleAuth");
const submissionRoutes = require("./routes/submissionRoutes");
const adminRoutes = require("./routes/adminRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("E-Magazine Backend Running");
});
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});