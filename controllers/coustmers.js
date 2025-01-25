const db = require("../config/db");

const getCustomer = (req, res) => {
  const customer = "select * from coustmer";
  db.query(customer, (err, result) => {
    if (err) {
      return res.status(403).send("error to get customer");
    }
    return res.status(200).send(result);
  });
};
const postCustomer = (req, res) => {
  const { user_id, name, email, phone, company } = req.body;
  try {
    if (!user_id || !name || !email || !phone || !company) {
      return res.status(403).json({ message: "required all fields" });
    }
    const findUser = "select * from backendusers where id=?";
    db.query(findUser, [user_id], (err, result) => {
      if (err) {
        return res.status(403).json({ message: "error to find user", err });
      }
      if (result.length === 0) {
        return res.status(403).json({ message: "user not found" });
      }
      const createQuery =
        "insert into coustmer(user_id, name, email, phone, company) values(?,?,?,?,?)";
      db.query(
        createQuery,
        [user_id, name, email, phone, company],
        (err, result) => {
          if (err) {
            return res
              .status(404)
              .json({ message: "error to insert customer", err });
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "already customer added" });
          }
          return res
            .status(200)
            .json({ message: "create customer successfully" });
        }
      );
    });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
const putCustomer = (req, res) => {
  const { id } = req.params;
  const { user_id, name, email, phone, company } = req.body;
  //   db.query(id)
  if (!id || !user_id || !name || !phone || !company || !email) {
    return res.send({ message: "required all fields" });
  }
  const queryId = "select * from coustmer where id=?";
  db.query(queryId, [id], (err, result) => {
    if (err) {
      return res.send({ message: "query error" });
    }
    if (result.length === 0) {
      return res.send({ message: "customer not exist" });
    }
    const update =
      "update coustmer set user_id=?,name=?,email=?, phone=?, company=?";
    db.query(update, [user_id, name, email, phone, company], (err, result) => {
      if (err) {
        return res.json({ message: "query error" });
      }
      return res.json({ message: "update data successfully" });
    });
  });
};
const deleteCustomer = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "id not found" });
  }
  const queryId = "select * from coustmer where id=?";

  db.query(queryId, [id], (err, result) => {
    if (err) {
      return res.send({ message: "query error" });
    }
    if (result.length === 0) {
      return res.send({ message: "customer not exist" });
    }
    const deleteId = "delete from coustmer where id=?";
    db.query(deleteId, id, (err, result) => {
      if (err) {
        return res.status(404).json({ message: "Query error" });
      }
      return res.json({ message: "delete customer successfully" });
    });
  });
};
module.exports = { getCustomer, postCustomer, putCustomer, deleteCustomer };
