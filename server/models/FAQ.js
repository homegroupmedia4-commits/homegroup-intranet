// models/FAQ.js
import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String
});

export default mongoose.model("FAQ", faqSchema);
