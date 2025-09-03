const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// Admin login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Set session
    req.session.adminId = admin._id;
    req.session.username = admin.username;

    res.json({ message: "Login successful", admin: { username: admin.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Admin logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie('connect.sid');
    res.json({ message: "Logout successful" });
  });
});

// Check admin authentication status
router.get("/status", (req, res) => {
  if (req.session && req.session.adminId) {
    res.json({ authenticated: true, username: req.session.username });
  } else {
    res.json({ authenticated: false });
  }
});

// Protected admin route example
router.get("/dashboard", requireAuth, (req, res) => {
  res.json({ message: "Welcome to admin dashboard", username: req.session.username });
});

// Create default admin (run once to create admin user)
router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    const admin = new Admin({
      username,
      password: hashedPassword
    });

    await admin.save();
    res.json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ error: "Failed to create admin" });
  }
});

module.exports = router;
