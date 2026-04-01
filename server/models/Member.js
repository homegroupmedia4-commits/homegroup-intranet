const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true
    },
    role: {
      type: String,
      required: [true, "Le rôle est requis"],
      trim: true
    },
    service: {
      type: String,
      default: "general"
    }, // ✅ virgule FIX

    company: {
      type: String,
      enum: ["homegroup", "mprenov", "homedesign", "media4"],
      default: "homegroup"
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
