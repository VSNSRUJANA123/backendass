const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const cookie = require("cookie-parser");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const userCreation = (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(403).json({ message: "required all fields" });
    }
    const findUser = "select * from backendusers where username=?";
    db.query(findUser, [username], async (err, result) => {
      if (err) {
        return res.status(404).json({ message: "error to get user" });
      }
      if (result.length > 0) {
        return res.status(403).json({ message: "user already exist" });
      }
      const createUser =
        "insert into backendusers(username,password) values(?,?)";
      const hashPassword = await bcrypt.hash(password, 10);
      if (!hashPassword) {
        return res.status(404).json({ message: "password not created" });
      }
      db.query(createUser, [username, hashPassword], (err, result) => {
        if (err) {
          return res.status(404).json({ message: "error to insert" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "failed to user register" });
        }
        return res.json({ message: "Register Created Successfully" });
      });
    });
  } catch (err) {
    return res
      .status(404)
      .json({ message: err.message || "something went wrong" });
  }
};
const userLogin = (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(403).json({ message: "required all fields" });
    }
    const findUser = "select * from backendusers where username=?";
    db.query(findUser, [username], async (err, result) => {
      if (err) {
        return res.status(403).json({ message: "Error to check username" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "user doesn't exist" });
      }
      const comaparePsw = await bcrypt.compare(password, result[0].password);
      const token = jwt.sign({ id: result[0] }, process.env.JWT_TOKEN, {
        expiresIn: "1d",
      });
      req.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 24 * 60 * 60,
      });
      if (comaparePsw) {
        return res.json({ message: "Login Successfully" });
      }
      return res.json({ message: "wrong password" });
    });
  } catch (err) {
    return res
      .status(404)
      .json({ message: err.message || "something went wrong" });
  }
};
const getUser = (req, res) => {
  const query = "select * from backendusers";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(403).send("query error");
    }
    return res.status(200).send(result);
  });
};
const userLogout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "logout successfully" });
};
module.exports = { userCreation, userLogin, getUser, userLogout };
