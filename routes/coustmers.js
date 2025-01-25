const db = require("../config/db");
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
router.get("/company", (req, res) => {
  const { company } = req.body;
  const queryCompany = "select * from coustmer where company=?";
  db.query(queryCompany, [company], (err, result) => {
    if (err) {
      return res.send("query error");
    }
    return res.json({ message: result });
  });
});
module.exports = router;
