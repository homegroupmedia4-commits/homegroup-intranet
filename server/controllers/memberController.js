const Member = require("../models/Member");

/* ======================
   GET ALL MEMBERS
====================== */
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération membres" });
  }
};

/* ======================
   CREATE MEMBER
====================== */
exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: "Erreur création membre" });
  }
};

/* ======================
   UPDATE MEMBER
====================== */
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ error: "Membre non trouvé" });
    }

    res.json(member);
  } catch (err) {
    res.status(400).json({ error: "Erreur update membre" });
  }
};

/* ======================
   DELETE MEMBER
====================== */
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ error: "Membre non trouvé" });
    }

    res.json({ message: "Membre supprimé" });
  } catch (err) {
    res.status(400).json({ error: "Erreur suppression membre" });
  }
};
