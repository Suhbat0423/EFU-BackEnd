require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");
const corsOptions = require("./lib/cors");

const app = express();
const { HOST, PORT } = process.env;

connectDB();

app.use(express.json());
app.use(corsOptions);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
