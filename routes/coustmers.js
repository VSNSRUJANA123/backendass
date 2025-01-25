const {
  getCustomer,
  postCustomer,
  putCustomer,
  deleteCustomer,
} = require("../controllers/coustmers");
const express = require("express");
const router = express.Router();
router.get("/", getCustomer);
router.post("/", postCustomer);
router.put("/:id", putCustomer);
router.delete("/:id", deleteCustomer);
module.exports = router;
