const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    temperature: Number,
    humidity: Number,
    aqi: Number,
    timestamp: Date,
  },
  { versionKey: false }
);

module.exports = mongoose.model("SensorData", SensorSchema);
