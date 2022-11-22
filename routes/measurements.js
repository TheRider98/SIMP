const express = require("express");
var app = express();
const router = express.Router();
const measurements = require("../models/Measurements.js");
const { validatePostInput } = require("../util/post_valid");
const jwtCheck = require("../util/check-auth");

// get all points
router.get("/get", async (req, res) => {
  try {
    const measurementsMessages = await measurements.find();
    res.status(200).json(measurementsMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// get specific amount of points
router.get("/getA/:num", async (req, res) => {
  try {
    var num = req.params.num.replace(":", "");
    const measurementsMessages = await measurements.find().sort({timestamp: -1}).limit(parseInt(num));
    var exportMeasurments = {
      "exportMeas" : measurementsMessages
    }
    res.status(200).json(exportMeasurments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// First Skip, then get specific amount of points
router.get("/getB/:num", async (req, res) => {
  try {
    var num = req.params.num.replace(":", "");
    const measurementsMessages = await measurements.find().sort({timestamp: -1}).skip(parseInt(num)).limit(parseInt(num));
    var exportMeasurments = {
      "exportMeas" : measurementsMessages
    }
    res.status(200).json(exportMeasurments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// add point to database
router.post("/create", async (req, res) => {
  //separate data from payload
  let {
    timestamp,
    metadata,
    voltage,
    current,
    power,
  } = req.body;
  //parse info into each category
  const Measurements = new measurements({
    timestamp: timestamp,
    metadata: metadata,
    voltage: voltage,
    current: current,
    power: power,
  });
  try {
    const newmeasurements = await Measurements.save();
    res.status(201).json(newmeasurements);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

async function getmeasurements(req, res, next) {
  let measurements;
  try {
    measurements = await measurements.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ msg: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
  res.user = measurements;
  next();
}

router.get("/getUser/:id", async (req, res) => {
  try {
    const measurementsMessages = await measurements.find({
      createdBy: `${req.params.id.replace(":", "")}`,
    });
    res.status(200).json(measurementsMessages);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// delete posts
router.delete("/del/:id", async (req, res) => {
  try {
    await measurements.findOneAndDelete({ _id: `${req.params.id.replace(":", "")}` });
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.get("/search/:cat/:inp", async (req, res) => {
  var queryParam = {};
  var cat = req.params.cat.replace(":", "");
  var input = req.params.inp.replace(":", "");
  queryParam[cat] = { $regex: input, $options: "i" };
  console.log(queryParam);

  try {
    const measurementsMessages = await measurements.find(queryParam);
    res.status(200).json(measurementsMessages);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/filter/lth", async (req, res) => {
  try {
    const measurementsMessages = await measurements.find({})
      .sort({ price: 1 })
      .collation({ locale: "en_US", numericOrdering: true });
    res.status(200).json(measurementsMessages);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.get("/filter/htl", async (req, res) => {
  try {
    const measurementsMessages = await measurements.find({})
      .sort({ price: -1 })
      .collation({ locale: "en_US", numericOrdering: true });
    res.status(200).json(measurementsMessages);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
