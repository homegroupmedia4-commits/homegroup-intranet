const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    service: {
      type: String,
      required: true
    },
    company: {
      type: String,
      enum: ["homegroup", "mprenov", "homedesign", "media4"],
      default: "mprenov"
    },
    phone: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Member", memberSchema);
