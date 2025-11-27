const Teacher = require("../models/Teacher");
const asyncHandler = require("express-async-handler");

exports.getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find({});
  res.status(200).json({ success: true, data: teachers });
});

exports.createTeacher = asyncHandler(async (req, res) => {
  const { firstname, lastname, teacherId, password, email } = req.body;

  const teacherExists = await Teacher.findOne({ teacherId });
  if (teacherExists) {
    res.status(400);
    throw new Error("Teacher with this teacherId already exists");
  }

  const teacher = await Teacher.create({
    firstname,
    lastname,
    teacherId,
    password,
    email,
  });

  res.status(201).json({ success: true, data: teacher });
});

exports.getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }
  res.status(200).json({ success: true, data: teacher });
});

exports.updateTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  const { firstname, lastname, teacherId, password, email } = req.body;

  teacher.firstname = firstname || teacher.firstname;
  teacher.lastname = lastname || teacher.lastname;
  teacher.teacherId = teacherId || teacher.teacherId;
  teacher.password = password || teacher.password;
  teacher.email = email || teacher.email;

  const updatedTeacher = await teacher.save();
  res.status(200).json({ success: true, data: updatedTeacher });
});

exports.deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  await teacher.deleteOne();
  res.status(200).json({ success: true, message: "Teacher removed" });
});
