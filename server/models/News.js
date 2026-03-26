const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  body: String,
  category: String,
  date: String,
  photo: String,
  video: String,
  pinned: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("News", NewsSchema);
