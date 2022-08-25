const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bcrypt = require("bcryptjs");

// Get All Users
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM rooms", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Gets one users
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM rooms WHERE room_id = ${req.params.id}`,
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

// Add a booking
router.post("/", (req, res) => {
  try {
    let sql = "INSERT INTO rooms SET ?";
    const { size, bedrooms, bathrooms, price, description } = req.body;

    // Database terms
    let room = {
      size,
      bedrooms,
      bathrooms,
      price,
      description,
    };
    // Connection to database
    con.query(sql, room, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({
        msg: `Booking was created successfully`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Edit booking by ID
router.put("/:id", (req, res) => {
  try {
    let sql = "UPDATE rooms SET ?";
    const { size, bedrooms, bathrooms, price, description, type } = req.body;
    let user = {
      size,
      bedrooms,
      bathrooms,
      price,
      description,
      type,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({
        msg: `Booking has been edited`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete one booking
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM rooms WHERE room_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;