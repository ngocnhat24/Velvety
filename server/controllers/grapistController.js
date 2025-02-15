const Grapist = require("../models/Grapist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Tạo Grapist mới
exports.createGrapist = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingGrapist = await Grapist.findOne({ email });
    if (existingGrapist) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo Grapist
    const grapist = await Grapist.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    res.status(201).json({ message: "Grapist created successfully", grapist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả Grapist
exports.getAllGrapist = async (req, res) => {
  try {
    const Grapists = await Grapist.find();
    res.status(200).json(Grapist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin Grapist theo ID
exports.getGrapistById = async (req, res) => {
  try {
    const grapist = await Grapist.findById(req.params.id);
    if (!grapist) return res.status(404).json({ message: "Grapist not found" });
    res.status(200).json(grapist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin Grapist
exports.updateGrapist = async (req, res) => {
  try {
    const grapist = await Grapist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!grapist) return res.status(404).json({ message: "Grapist not found" });
    res.status(200).json(grapist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa Grapist
exports.deleteGrapist = async (req, res) => {
  try {
    const grapist = await Grapist.findByIdAndDelete(req.params.id);
    if (!grapist) return res.status(404).json({ message: "Grapist not found" });
    res.status(200).json({ message: "Grapist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập Grapist
exports.loginGrapist = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra Grapist có tồn tại không
    const grapist = await Grapist.findOne({ email });
    if (!grapist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, grapist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Tạo token
    const token = jwt.sign({ grapistId: grapist._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
