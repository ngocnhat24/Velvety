const User = require('../models/User');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, roleName } = req.body;

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create the user with isVerified set to false
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      roleName,
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const verificationLink = `http://localhost:5000/verify/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verify Your Email",
      html: `<p>Hi ${user.firstName},</p>
             <p>Thank you for registering. Please click the link below to verify your email:</p>
             <a href="${verificationLink}">${verificationLink}</a>
             <p>If you did not register, please ignore this email.</p>`,
    });

    res.status(201).json({ message: "User registered successfully. Please check your email to verify your account." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired verification token." });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Remove the token after verification
    await user.save();

    res.status(200).json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
