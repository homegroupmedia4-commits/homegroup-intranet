const Group = require("../models/Group");

/* ======================
   DEFAULT DATA (SOURCE UNIQUE)
====================== */
const DEFAULT_GROUP = {
  heroTitle: "22 ans d'expérience à votre service",
  heroText:
    "De la construction à l'équipement des habitations HOME GROUP vous propose une offre 360° grâce à ses différentes structures.",
  startYear: 2004,
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

    if (!data) {
      data = await Group.create(DEFAULT_GROUP);
      return res.json(data);
    }

    let updated = false;

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

    if (updated) await data.save();

    res.json(data);

  } catch (err) {
    console.error("❌ GET GROUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
