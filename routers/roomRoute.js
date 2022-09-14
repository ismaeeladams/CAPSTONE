const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bcrypt = require("bcryptjs");
const middleware = require("../middleware/auth");

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
    const {
      name,
      size,
      bedrooms,
      bathrooms,
      price,
      description,
      type,
      image,
      image_2,
      image_3,
    } = req.body;

    // Database terms
    let room = {
      name,
      size,
      bedrooms,
      bathrooms,
      price,
      description,
      type,
      image,
      image_2,
      image_3,
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
router.patch("/:id", middleware, (req, res) => {
  try {
    let sql = "UPDATE rooms SET ?";
    const {
      name,
      size,
      bedrooms,
      bathrooms,
      price,
      description,
      type,
      image,
      image_2,
      image_3,
    } = req.body;
    let user = {
      name,
      size,
      bedrooms,
      bathrooms,
      price,
      description,
      type,
      image,
      image_2,
      image_3,
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
router.delete("/:id", middleware, (req, res) => {
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
