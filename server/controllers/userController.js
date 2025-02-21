const User = require('../models/User');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Đăng ký tài khoản
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, roleName, phoneNumber } = req.body;

    // Kiểm tra email hoặc số điện thoại đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email
          ? "Email already in use"
          : "Phone number already in use",
      });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mã xác thực email
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Tạo user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleName,
      phoneNumber,
      verified: false,
      verificationToken,
    });

    // Gửi email xác thực
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verify Your Email",
      html: `
        <h2>Welcome, ${user.firstName}!</h2>
        <p>Click the button below to verify your email:</p>
        <a href="${verificationUrl}" style="display:inline-block; padding:10px 20px; color:white; background-color:#c86c79; text-decoration:none; border-radius:5px;">
          Verify Email
        </a>
        <p>If you did not sign up, ignore this email.</p>
      `,
    });

    res.status(201).json({ message: "User registered! Please verify your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xác thực email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "No token provided" });

    const user = await User.findOne({ verificationToken: token });
    if (!user || user.verified) {
      return res.json({ message: "Email already verified or invalid token." });
    }

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Email verified successfully! You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Verification failed. Try again." });
  }
};

// Lấy danh sách tất cả user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roleId');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy user theo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('roleId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user.verified) return res.status(400).json({ message: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    console.log("User Data:", user);

    const token = jwt.sign(
      { userId: user._id, role: user.roleName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Decoded Token:", jwt.decode(token));

    let redirectUrl;
    switch (user.roleName) {
      case "Customer":
        redirectUrl = "/customer";
        break;
      case "Staff":
        redirectUrl = "/staff";
        break;
      case "Manager":
        redirectUrl = "/manager";
        break
      case "Admin":
        redirectUrl = "/dashboard";
        break;
      case "Therapist":
        redirectUrl = "/therapist";
        break;
      default:
        redirectUrl = "/";
    }

    res.status(200).json({ token, role: user.roleName, redirectUrl, message: "Login successful" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Email has not been registered." });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display:inline-block; padding:10px 20px; color:white; background-color:#c86c79; text-decoration:none; border-radius:5px;">
          Reset Password
        </a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    res.status(200).json({ message: "Password reset link sent to your email." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token." });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now log in." });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong. Try again." });
  }
};

//logout
exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Lax" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed. Please try again." });
  }
};
