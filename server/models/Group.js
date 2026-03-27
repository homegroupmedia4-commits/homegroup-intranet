const mongoose = require("mongoose");

const EntitySchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  badge: String,
  color: String
});

const GroupSchema = new mongoose.Schema({
  heroTitle: String,
  heroText: String,
  stats: [
    {
      value: String,
      label: String
    }
  ],
  entities: [EntitySchema]
});

module.exports = mongoose.model("Group", GroupSchema);
