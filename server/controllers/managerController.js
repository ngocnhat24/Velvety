const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Tạo Manager mới
exports.createManager = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo Manager
    const manager = await Manager.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    res.status(201).json({ message: "Manager created successfully", manager });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả Manager
exports.getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin Manager theo ID
exports.getManagerById = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    if (!manager) return res.status(404).json({ message: "Manager not found" });
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin Manager
exports.updateManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!manager) return res.status(404).json({ message: "Manager not found" });
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa Manager
exports.deleteManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndDelete(req.params.id);
    if (!manager) return res.status(404).json({ message: "Manager not found" });
    res.status(200).json({ message: "Manager deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập Manager
exports.loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra Manager có tồn tại không
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Tạo token
    const token = jwt.sign({ managerId: manager._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
