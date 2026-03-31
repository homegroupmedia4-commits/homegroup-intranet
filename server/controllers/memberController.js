const Member = require("../models/Member");

/* ======================
   GET ALL MEMBERS
====================== */
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.error("❌ getMembers:", err);
    res.status(500).json({ error: "Erreur récupération membres" });
  }
};

/* ======================
   CREATE MEMBER
====================== */
exports.createMember = async (req, res) => {
  try {
    const {
      name,
      role,
      service,
      company,
      phone,
      email,
      desc
    } = req.body;

    // validation minimale
    if (!name || !role) {
      return res.status(400).json({
        error: "Nom et rôle obligatoires"
      });
    }

    const member = await Member.create({
      name: name.trim(),
      role: role.trim(),
      service: service || "general",
      company: company || "homegroup",
      phone: phone || "",
      email: email || "",
      desc: desc || ""
    });

    res.json(member);

  } catch (err) {
    console.error("❌ createMember:", err);
    res.status(400).json({
      error: err.message || "Erreur création membre"
    });
  }
};

/* ======================
   UPDATE MEMBER
====================== */
exports.updateMember = async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        name: req.body.name?.trim(),
        role: req.body.role?.trim()
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Membre non trouvé"
      });
    }

    res.json(updated);

  } catch (err) {
    console.error("❌ updateMember:", err);
    res.status(400).json({
      error: "Erreur update membre"
    });
  }
};

/* ======================
   DELETE MEMBER
====================== */
exports.deleteMember = async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Membre non trouvé"
      });
    }

    res.json({ message: "Membre supprimé" });

  } catch (err) {
    console.error("❌ deleteMember:", err);
    res.status(400).json({
      error: "Erreur suppression membre"
    });
  }
};
