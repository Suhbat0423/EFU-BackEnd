const express = require("express");

const router = express.Router();

const studentRoutes = require("./student");
const teacherRoutes = require("./teacher");
const authRoutes = require("./auth");
const achievementRoutes = require("./achievement");

router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);
router.use("/login", authRoutes);
router.use("/achievements", achievementRoutes);

module.exports = router;
