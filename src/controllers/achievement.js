const achievement = require("../models/Achievement");
const asyncHandler = require("express-async-handler");

exports.getAchievements = asyncHandler(async (req, res) => {
  const achievements = await achievement.find({});
  res.status(200).json({ success: true, data: achievements });
});

exports.createAchievement = asyncHandler(async (req, res) => {
  const { title, description, studentId } = req.body;

  const newAchievement = await achievement.create({
    title,
    description,
  });

  res.status(201).json({ success: true, data: newAchievement });
});
