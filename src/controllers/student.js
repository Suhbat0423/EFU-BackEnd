const Student = require("../models/Student");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.status(200).json({ success: true, data: students });
});

exports.createStudent = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    studentId,
    password,
    email,
    class: className,
  } = req.body;

  const studentExists = await Student.findOne({ studentId });
  if (studentExists) {
    res.status(400);
    throw new Error("Student with this studentId already exists");
  }

  const student = await Student.create({
    firstname,
    lastname,
    studentId,
    password: await bcrypt.hash(password, 10),
    email,
    class: className,
  });

  res.status(201).json({ success: true, data: student });
});

exports.getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.status(200).json({ success: true, data: student });
});

exports.updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  const {
    firstname,
    lastname,
    studentId,
    password,
    email,
    class: className,
  } = req.body;

  student.firstname = firstname || student.firstname;
  student.lastname = lastname || student.lastname;
  student.studentId = studentId || student.studentId;
  student.password = password
    ? await bcrypt.hash(password, 10)
    : student.password;
  student.email = email || student.email;
  student.class = className || student.class;

  const updatedStudent = await student.save();
  res.status(200).json({ success: true, data: updatedStudent });
});

exports.deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  await student.deleteOne();
  res.status(200).json({ success: true, message: "Student removed" });
});
