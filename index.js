const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 8008); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

const userRoute = require("./routers/userRoute");
const bookingRoute = require("./routers/bookingRoute");

app.use("/users", userRoute);
app.use("/bookings", bookingRoute);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "./index.html");
});
