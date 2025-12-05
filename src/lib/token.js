const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY =
  process.env.SECRET_KEY ||
  process.env.JWT_SECRET ||
  "your-secret-key-change-in-production";

exports.generateToken = ({ id }) => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1h" });
};

exports.verifyToken = (req) => {
  const auth = req.headers.authorization;
  if (!auth) throw new Error("No auth");
  const token = auth.split(" ")[1];
  const { id, exp } = jwt.verify(token, SECRET_KEY);
  const expDate = new Date(exp * 1000);

  req.userId = id;
  req.token = token;
  req.tokenExpDate = expDate;

  return { id, expDate };
};
