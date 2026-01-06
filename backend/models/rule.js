const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  metric: String,
  min: Number,
  max: Number
});

module.exports = mongoose.model("Rule", RuleSchema);
