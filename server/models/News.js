const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: {
    type: String,
    enum: ["general", "rh", "direction", "organisation", "it", "evenement"],
    default: "general"
  },
  date: String,
  photo: String,
  video: String,
  pinned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("News", NewsSchema);
