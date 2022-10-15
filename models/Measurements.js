const { model, Schema, Mongoose } = require("mongoose");

const measurementsSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  metadata: {
    type: Object,
    required: true,
  },
  voltage: {
    type: String,
    required: true,
  },
  current: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
});

const Measurements = model("Measurements", measurementsSchema);

module.exports = Measurements;
