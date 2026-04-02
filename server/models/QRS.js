// models/QRS.js

const mongoose = require("mongoose");

const qrsSchema = new mongoose.Schema({
  prenom: {
    type: String,
    trim: true,
    default: ""
  },

  nom: {
    type: String,
    trim: true,
    default: ""
  },

  isAnon: {
    type: Boolean,
    default: false
  },

  

category: {
  type: String,
  default: "Question"
},

  

  message: {
    type: String,
    required: true,
    trim: true
  },

  public: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  adminNote: {
    type: String,
    default: ""
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("QRS", qrsSchema);
