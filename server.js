if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");

// db uri, mongodb connection string
const uri = process.env.MONGODB_URI;

const app = express();

// basic set up
app.use(cors());
// body parser included in express
app.use(express.json({ limit: "50mb" }));
// handle form submissions / urlencoded data
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// connect DB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connected");
});

// app.get("/", (req, res) => {
//   res.send("Testing");
// });

// Passport middleware
app.use(passport.initialize());

// use routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const measurementsRouter = require("./routes/measurements");
app.use("/measurements", measurementsRouter);

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// create port
const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

const io = require("socket.io").listen(server);

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});
