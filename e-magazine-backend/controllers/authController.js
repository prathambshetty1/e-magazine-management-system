const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const otpGenerator = require("otp-generator");

// ==========================
// Register User
// ==========================

const registerUser = async (req, res) => {
  try {
    const { name, usn, email, password } = req.body;

    if (!email.endsWith("@nmamit.in")) {
      return res.status(400).json({
        message: "Only NMAMIT email addresses are allowed",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { usn }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      usn,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
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

// ==========================
// Login User
// ==========================

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        department: user.department,
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

// ==========================
// Forgot Password
// ==========================

const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

   user.otp = otp;

user.otpExpiry = new Date(
  Date.now() + 10 * 60 * 1000
);

user.otpVerified = false;

await user.save();

    await sendEmail(
      user.email,
      "NMAMIT E-Magazine Password Reset OTP",
      `
      <div style="font-family:Arial,sans-serif;padding:20px">

        <h2 style="color:#059669">
          NMAMIT E-Magazine
        </h2>

        <p>Hello <strong>${user.name}</strong>,</p>

        <p>You requested to reset your password.</p>

        <p>Your OTP is:</p>

        <div
          style="
            font-size:36px;
            font-weight:bold;
            letter-spacing:8px;
            color:#059669;
            margin:20px 0;
          "
        >
          ${otp}
        </div>

        <p>
          This OTP is valid for
          <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not request this,
          simply ignore this email.
        </p>

        <br>

        <p>
          Regards,
          <br>
          <strong>NMAMIT E-Magazine Team</strong>
        </p>

      </div>
      `
    );

    res.status(200).json({
      message: "OTP sent successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==========================
// Verify OTP
// ==========================

const verifyOtp = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (!user.otp) {
      return res.status(400).json({
        message: "No OTP has been generated.",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired.",
      });
    }

    user.otpVerified = true;

await user.save();

res.status(200).json({
  message: "OTP verified successfully.",
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==========================
// Reset Password
// ==========================

const resetPassword = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (!user.otpVerified) {
  return res.status(400).json({
    message: "Please verify your OTP first.",
  });
}

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

user.otp = null;
user.otpExpiry = null;
user.otpVerified = false;

await user.save();

    res.status(200).json({
      message: "Password reset successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==========================
// Test Email
// ==========================

const testEmail = async (req, res) => {
  try {

    await sendEmail(
      process.env.EMAIL_USER,
      "NMAMIT E-Magazine Test Email",
      `
      <h2>🎉 Email Configuration Successful</h2>

      <p>Your email configuration is working correctly.</p>

      <p>Regards,<br><strong>NMAMIT E-Magazine Team</strong></p>
      `
    );

    res.status(200).json({
      message: "Test email sent successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  testEmail,
};