const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookie = require("cookie-parser");
app.use(cors());
app.use(express.json());
app.use(cookie());
const db = require("./config/db");
app.use("/api/auth", require("./routes/user"));
app.use("/customer", require("./routes/coustmers"));
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log("server running", PORT);
});
