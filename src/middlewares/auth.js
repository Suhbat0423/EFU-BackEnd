const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if (student && (await bcrypt.compare(password, student.password))) {
    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || "your-secret-key-change-in-production",
      { expiresIn: "1h" }
    );

    // return token + user data (omit password)
    const userData = {
      _id: student._id,
      firstname: student.firstname,
      lastname: student.lastname,
      studentId: student.studentId,
      email: student.email,
      class: student.class,
    };

    res.status(200).json({ success: true, token, data: userData });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key-change-in-production"
    );
    req.student = await Student.findById(decoded.id);

    if (!req.student) {
      res.status(404);
      throw new Error("Student not found");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }
});

// isAuth middleware (uses token lib verifyToken)
const { verifyToken } = require("../lib/token");

exports.isAuth = (req, res, next) => {
  try {
    const { id } = verifyToken(req);
    if (!id) throw new Error("No token");
    // attach id as userId for downstream handlers
    req.userId = id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
