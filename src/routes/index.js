const express = require("express");

const router = express.Router();

const studentRoutes = require("./student");
const teacherRoutes = require("./teacher");

router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);

module.exports = router;
