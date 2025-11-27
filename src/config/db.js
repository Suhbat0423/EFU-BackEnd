const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DB_URl;

const connectDB = async () => {
  if (!dbUrl) {
    console.error(
      "MongoDB connection failed: no connection string found. Set `DB_URL`, `MONGO_URI`, or `DATABASE_URL` in your environment."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
