const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require("../middleware/auth");

// Gets all reservation
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM reservation", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Gets one reservation
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM reservation WHERE reserve_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
    // res.send({ id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Add new reservation
router.post("/", middleware, (req, res) => {
  console.log("test");
  const {
    image_2,
    image,
    image_3,
    name,
    size,
    bedrooms,
    bathrooms,
    price,
    description,
    type,
  } = req.body;

  const reservation = [];
  const booking = JSON.stringify(req.body);
  reservation.push(booking);
  console.log(reservation);
  try {
    let sql = "SELECT * FROM users WHERE ?";
    const user = {
      user_id: req.user.user_id,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      let orderSql = "INSERT INTO reservation SET ?";
      let order = {
        user_id: result[0].user_id,
        reservation: reservation,
      };
      con.query(orderSql, order, (err, result) => {
        if (err) throw err;
        res.send("Order Placed");
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete one order
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM reservation WHERE reserve_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result, "Reservation was successfully deleted");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Edit order by ID
router.put("/:id", (req, res) => {
  const { reservation } = req.body;
  try {
    let orderSql = "UPDATE reservation SET ?";
    let jsonCart = JSON.stringify(reservation);
    let order = {
      reservation: jsonCart,
    };
    con.query(orderSql, order, (err, result) => {
      if (err) throw err;
      res.send("Order Edited");
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
