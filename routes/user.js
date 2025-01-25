const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const cookie = require("cookie-parser");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const {
  userCreation,
  userLogin,
  getUser,
  userLogout,
} = require("../controllers/user");
router.post("/register", userCreation);
router.post("/login", userLogin);
router.get("/", getUser);
router.get("/logout", userLogout);
module.exports = router;
