// models/QRS.js
import mongoose from "mongoose";

const qrsSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  isAnon: Boolean,
  category: String,
  message: String,
  public: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("QRS", qrsSchema);
