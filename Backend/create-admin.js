const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    try {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ username: "Ansh" });
      if (existingAdmin) {
        console.log("❌ Admin user already exists");
        process.exit(0);
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("2931929319Aa@", saltRounds);

      // Create admin
      const admin = new Admin({
        username: "Ansh",
        password: hashedPassword
      });

      await admin.save();
      console.log("✅ Admin user created successfully!");
      console.log("Username: Ansh");
      console.log("Password: 2931929319Aa@");
    } catch (error) {
      console.error("❌ Error creating admin:", error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
