const achievement = require("../models/Achievement");
const Student = require("../models/Student");
const asyncHandler = require("express-async-handler");

exports.getAchievements = asyncHandler(async (req, res) => {
  const achievements = await achievement.find({}).populate("student");
  res.status(200).json({ success: true, data: achievements });
});

exports.createAchievement = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Please provide title and description");
  }

  const newAchievement = await achievement.create({
    title,
    description,
    student: req.student._id,
  });

  res.status(201).json({ success: true, data: newAchievement });
});
