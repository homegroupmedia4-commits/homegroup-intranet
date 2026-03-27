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
  /* HERO */
  heroTitle: { type: String, default: "" },
  heroText: { type: String, default: "" },

  /* YEARS (calcul auto front) */
  startYear: {
    type: Number,
    default: 2004,
    min: 1900,
    max: new Date().getFullYear()
  },

  /* ======================
     STATS (nouveau)
  ====================== */
  stats: {
    experienceLabel: {
      type: String,
      default: "ans d'expérience"
    },
    entitiesLabel: {
      type: String,
      default: "entités spécialisées"
    },
    offerLabel: {
      type: String,
      default: "offre complète"
    },

    // optionnel si tu veux rendre 360 dynamique
    offerValue: {
      type: String,
      default: "360°"
    }
  },

  /* ======================
     WEBSITE (nouveau)
  ====================== */
  website: {
    url: {
      type: String,
      default: "https://home-group.fr"
    },
    label: {
      type: String,
      default: "Site web officiel"
    },
    description: {
      type: String,
      default: "Retrouvez toutes nos actualités sur"
    }
  },

  /* ======================
     ENTITIES
  ====================== */
  entities: {
    type: [EntitySchema],
    default: []
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Group", GroupSchema);
