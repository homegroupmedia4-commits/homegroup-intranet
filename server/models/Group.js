const mongoose = require("mongoose");

const EntitySchema = new mongoose.Schema({
  badgeText: String,
  badgeColor: String,
  badgeTextColor: String,
  icon: String,
  title: String,
  description: String,
  url: String
});

const GroupSchema = new mongoose.Schema({
  heroTitle: String,
  heroText: String,
  startYear: { type: Number, default: 2004 },
  entities: [EntitySchema]
});

module.exports = mongoose.model("Group", GroupSchema);
