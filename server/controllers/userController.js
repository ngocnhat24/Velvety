const User = require('../models/User');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, roleName, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleName,
      phoneNumber,
      verified: false, // User is unverified at first
      verificationToken, // Store the token
    });

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Sender email
        pass: process.env.EMAIL_PASSWORD, // App password (not normal password)
      },
    });

    const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;
    const mailOptions = {
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
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "User registered! Please verify your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    console.log("Received Token:", req.query.token);

    const token = req.query.token;
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const user = await User.findOne({ verificationToken: token });
    console.log("User Found:", user);

    if (!user) {
      return res.json({ message: "Email already verified or invalid token." }); // Do not return 400 error
    }

    if (user.verified) {
      return res.json({ message: "Email already verified." });
    }

    // Verify the user
    user.verified = true;
    user.verificationToken = null;
    await user.save();
    console.log("User verified:", user.email);

    res.json({ message: "Email verified successfully! You can now log in." });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Verification failed. Try again." });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roleId');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('roleId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user is verified
    if (!user.verified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirect URL
    let redirectUrl;
    switch (user.roleName) {
      case "Customer":
        redirectUrl = "http://localhost:5173/customer";
        break;
      case "Staff":
        redirectUrl = "http://localhost:5173/staff";
        break;
      case "Manager":
        redirectUrl = "http://localhost:5173/manager";
        break;
      case "Admin":
        redirectUrl = "http://localhost:5173/admin";
        break;
      case "Therapist":
        redirectUrl = "http://localhost:5173/therapist";
        break;
      default:
        redirectUrl = "http://localhost:5173";
    }
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};