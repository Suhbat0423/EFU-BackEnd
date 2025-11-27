const cors = require("cors");
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
});

module.exports = corsOptions;
