const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["pdf", "url", "text", "word", "excel"],
    required: true
  },
  name: { type: String, required: true },
  content: { type: String, default: "" },
  url: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
