const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for admin seeding"))
  .catch((err) => console.log(err));

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const admin = new Admin({
      name: "Ifra",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};

createAdmin();