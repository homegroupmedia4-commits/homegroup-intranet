const Group = require("../models/Group");

// GET
exports.getGroup = async (req, res) => {
  try {
    const data = await Group.findOne();

    // 👇 si vide → on renvoie un objet par défaut
    if (!data) {
      return res.json({
        heroTitle: "",
        heroText: "",
        entities: [],
        stats: []
      });
    }

    res.json(data);

  } catch (err) {
    console.error("❌ GET GROUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
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
