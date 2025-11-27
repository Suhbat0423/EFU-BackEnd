const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/student");

router.route("/").get(getStudents);
router.route("/").post(createStudent);
router.route("/:id").get(getStudentById);
router.route("/:id").put(updateStudent);
router.route("/:id").delete(deleteStudent);

module.exports = router;
