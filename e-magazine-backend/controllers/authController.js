const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, usn, email, password } = req.body;

    // Check NMAMIT email
    if (!email.endsWith("@nmamit.in")) {
      return res.status(400).json({
        message: "Only NMAMIT email addresses are allowed",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { usn }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      usn,
      email,
      password: hashedPassword,
    });

    const userResponse = {
  _id: user._id,
  name: user.name,
  usn: user.usn,
  email: user.email,
  role: user.role,
  department: user.department,
};

res.status(201).json({
  message: "User registered successfully",
  user: userResponse,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        usn: user.usn,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};