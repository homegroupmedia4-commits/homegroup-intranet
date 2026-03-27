const Group = require("../models/Group");

/* ======================
   DEFAULT DATA (SOURCE UNIQUE)
====================== */
const DEFAULT_GROUP = {
  heroTitle: "22 ans d'expérience à votre service",
  heroText:
    "De la construction à l'équipement des habitations HOME GROUP vous propose une offre 360° grâce à ses différentes structures.",

  startYear: 2004,

  /* ======================
     STATS (NEW)
  ====================== */
stats: {
  experienceValue: "22",
  experienceLabel: "ans d'expérience",

  entitiesValue: "3",
  entitiesLabel: "entités spécialisées",

  offerValue: "360°",
  offerLabel: "offre complète"
},

  /* ======================
     WEBSITE (NEW)
  ====================== */
  website: {
    url: "https://home-group.fr",
    label: "Site web officiel",
    description: "Retrouvez toutes nos actualités sur"
  },

  /* ======================
     ENTITIES
  ====================== */
  entities: [
    {
      badgeText: "Rénovation",
      badgeColor: "#fff3e0",
      badgeTextColor: "#e65100",
      icon: "🔨",
      title: "MP RENOV",
      description:
        "Spécialiste des travaux de rénovation clé en main. MP Renov maîtrise l'ensemble des corps d'état nécessaires aux réhabilitations TCE pour l'habitat collectif, les mises aux normes PMR, chambres d'étudiants et locaux commerciaux.",
      url: "https://www.mp-renov.fr"
    },
    {
      badgeText: "Design & Équipement",
      badgeColor: "#e3f2fd",
      badgeTextColor: "#1565c0",
      icon: "🏠",
      title: "HOME DESIGN",
      description:
        "Le spécialiste des cuisines, salles de bain, ameublements, revêtements et rénovation intérieure. Des prestations haut de gamme avec un excellent rapport qualité-prix.",
      url: "https://homedesign-paris.com/"
    },
    {
      badgeText: "Communication digitale",
      badgeColor: "#f3e5f5",
      badgeTextColor: "#6a1b9a",
      icon: "📺",
      title: "MEDIA4",
      description:
        "Solutions d'affichage dynamique pilotables à distance pour vos halls d'accueil, loges, bureaux et salles de réunion.",
      url: "http://media4.fr/"
    }
  ]
};

/* ======================
   GET GROUP
====================== */

exports.getGroup = async (req, res) => {
  try {
    let data = await Group.findOne();

    /* ======================
       FIRST INIT
    ====================== */
    if (!data) {
      data = await Group.create(DEFAULT_GROUP);
      return res.json(data);
    }

    let updated = false;

    /* ======================
       SAFE MIGRATION (CRUCIAL)
    ====================== */

    if (!data.heroTitle) {
      data.heroTitle = DEFAULT_GROUP.heroTitle;
      updated = true;
    }

    if (!data.heroText) {
      data.heroText = DEFAULT_GROUP.heroText;
      updated = true;
    }

    if (!data.startYear) {
      data.startYear = DEFAULT_GROUP.startYear;
      updated = true;
    }

    if (!data.entities || data.entities.length === 0) {
      data.entities = DEFAULT_GROUP.entities;
      updated = true;
    }

    /* ======================
       NEW FIELDS MIGRATION
    ====================== */

    if (!data.stats) {
      data.stats = DEFAULT_GROUP.stats;
      updated = true;
} else {
  /* ✅ AJOUT ICI (TRÈS IMPORTANT) */
  if (!data.stats.experienceValue)
    data.stats.experienceValue = DEFAULT_GROUP.stats.experienceValue;

  if (!data.stats.entitiesValue)
    data.stats.entitiesValue = DEFAULT_GROUP.stats.entitiesValue;

  /* EXISTANT */
  if (!data.stats.experienceLabel)
    data.stats.experienceLabel = DEFAULT_GROUP.stats.experienceLabel;

  if (!data.stats.entitiesLabel)
    data.stats.entitiesLabel = DEFAULT_GROUP.stats.entitiesLabel;

  if (!data.stats.offerLabel)
    data.stats.offerLabel = DEFAULT_GROUP.stats.offerLabel;

  if (!data.stats.offerValue)
    data.stats.offerValue = DEFAULT_GROUP.stats.offerValue;

  updated = true;
}

    if (!data.website) {
      data.website = DEFAULT_GROUP.website;
      updated = true;
    } else {
      if (!data.website.url)
        data.website.url = DEFAULT_GROUP.website.url;

      if (!data.website.label)
        data.website.label = DEFAULT_GROUP.website.label;

      if (!data.website.description)
        data.website.description = DEFAULT_GROUP.website.description;

      updated = true;
    }

    if (updated) await data.save();

    res.json(data);

  } catch (err) {
    console.error("❌ GET GROUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ======================
   UPDATE GROUP
====================== */

exports.updateGroup = async (req, res) => {
  try {
    const data = await Group.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true
      }
    );

    res.json(data);

  } catch (err) {
    console.error("❌ UPDATE GROUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
