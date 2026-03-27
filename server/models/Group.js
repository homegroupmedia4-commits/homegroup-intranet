const mongoose = require("mongoose");

/* ======================
   ENTITY
====================== */
const EntitySchema = new mongoose.Schema({
  badgeText: { type: String, default: "" },
  badgeColor: { type: String, default: "#eee" },
  badgeTextColor: { type: String, default: "#000" },
  icon: { type: String, default: "🏢" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  url: { type: String, default: "" }
});

/* ======================
   GROUP
====================== */
const GroupSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "" },
  heroText: { type: String, default: "" },

  // 👉 IMPORTANT pour ton calcul auto des années
  startYear: {
    type: Number,
    default: 2004,
    min: 1900,
    max: new Date().getFullYear()
  },

  entities: {
    type: [EntitySchema],
    default: []
  }

}, {
  timestamps: true // ✅ utile pour debug / future admin
});

module.exports = mongoose.model("Group", GroupSchema);
