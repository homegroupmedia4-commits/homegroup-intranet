// models/QRS.js
import mongoose from "mongoose";

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
    enum: ["Question", "Suggestion", "Amélioration", "Problème", "Autre"],
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

export default mongoose.model("QRS", qrsSchema);
