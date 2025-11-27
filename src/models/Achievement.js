const mongoose = require("mongoose");
const { create } = require("./Student");
const Schema = mongoose.Schema;

const AchievementSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  student: { type: Schema.ObjectId, ref: "Student", required: true },
  imageURl: { type: String, trim: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
