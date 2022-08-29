const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// Get All Users
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM reviews", (err, result) => {
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
      `SELECT * FROM reviews WHERE review_id = ${req.params.id}`,
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

// Add review
router.post("/", (req, res) => {
  try {
    let sql = "INSERT INTO reviews SET ?";
    const { name, thumbnail_image, review } = req.body;
    let user = {
      name,
      thumbnail_image,
      review,
    };
    // Connection to database
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({
        msg: `Review created successfully`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete one users
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM reviews WHERE review_id = ${req.params.id}`,
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

// Edit Users by ID
router.put("/:id", (req, res) => {
  try {
    let sql = "UPDATE reviews SET ?";
    const { thumbnail_image, review } = req.body;
    let user = {
      thumbnail_image,
      review,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({
        msg: `Review has been edited`,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;