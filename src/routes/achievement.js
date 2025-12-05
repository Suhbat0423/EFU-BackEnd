const express = require("express");
const router = express.Router();

const {
  getAchievements,
  createAchievement,
} = require("../controllers/achievement");

const { protect } = require("../middlewares/auth");

router.route("/").get(getAchievements);
router.route("/").post(protect, createAchievement);

module.exports = router;
