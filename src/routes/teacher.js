const express = require("express");
const router = express.Router();

const {
  getTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacher");

router.route("/").get(getTeachers);
router.route("/").post(createTeacher);
router.route("/:id").get(getTeacherById);
router.route("/:id").put(updateTeacher);
router.route("/:id").delete(deleteTeacher);

module.exports = router;
