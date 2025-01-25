const cookie = require("cookie-parser");
const authMiddleware = (req, res, next) => {
  const token = res.cookie.token;
};
module.exports = authMiddleware;
