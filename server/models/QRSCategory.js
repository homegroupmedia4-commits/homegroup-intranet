const mongoose = require("mongoose");

const qrsCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

module.exports =
  mongoose.models.QRSCategory ||
  mongoose.model("QRSCategory", qrsCategorySchema);
