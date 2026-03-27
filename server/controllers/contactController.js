// controllers/contactController.js
import QRS from "../models/QRS.js";
import FAQ from "../models/FAQ.js";

/* ======================
   FAQ
====================== */

// GET all FAQ
export const getFaq = async (req, res) => {
  try {
    const data = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("❌ getFaq:", err);
    res.status(500).json({ error: "Erreur serveur FAQ" });
  }
};

// GET categories
export const getFaqCategories = async (req, res) => {
  try {
    const cats = await FAQ.distinct("category");
    res.json(cats);
  } catch (err) {
    console.error("❌ getFaqCategories:", err);
    res.status(500).json({ error: "Erreur catégories FAQ" });
  }
};

// CREATE FAQ
export const createFaq = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Champs requis" });
    }

    const faq = new FAQ({
      question,
      answer,
      category: category || "Général"
    });

    await faq.save();
    res.json(faq);

  } catch (err) {
    console.error("❌ createFaq:", err);
    res.status(500).json({ error: "Erreur création FAQ" });
  }
};

// DELETE FAQ
export const deleteFaq = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ deleteFaq:", err);
    res.status(500).json({ error: "Erreur suppression FAQ" });
  }
};



/* ======================
   QRS
====================== */

// CREATE QRS
export const createQRS = async (req, res) => {
  try {
    const q = new QRS(req.body);
    await q.save();
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ createQRS:", err);
    res.status(500).json({ error: "Erreur création QRS" });
  }
};

// GET public QRS
export const getPublicQRS = async (req, res) => {
  try {
    const data = await QRS.find({ public: true })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.error("❌ getPublicQRS:", err);
    res.status(500).json({ error: "Erreur QRS public" });
  }
};

// GET all QRS (admin)
export const getAllQRS = async (req, res) => {
  try {
    const data = await QRS.find()
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.error("❌ getAllQRS:", err);
    res.status(500).json({ error: "Erreur QRS admin" });
  }
};

// UPDATE STATUS (approved / rejected)
export const updateQRSStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const q = await QRS.findById(req.params.id);
    if (!q) return res.status(404).json({ error: "QRS introuvable" });

    q.status = status;
    await q.save();

    res.json(q);

  } catch (err) {
    console.error("❌ updateQRSStatus:", err);
    res.status(500).json({ error: "Erreur update status" });
  }
};

// TOGGLE VISIBILITY (public / privé)
export const toggleQRSVisibility = async (req, res) => {
  try {
    const q = await QRS.findById(req.params.id);
    if (!q) return res.status(404).json({ error: "QRS introuvable" });

    q.public = !q.public;
    await q.save();

    res.json(q);

  } catch (err) {
    console.error("❌ toggleQRSVisibility:", err);
    res.status(500).json({ error: "Erreur visibilité QRS" });
  }
};

// DELETE QRS
export const deleteQRS = async (req, res) => {
  try {
    await QRS.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ deleteQRS:", err);
    res.status(500).json({ error: "Erreur suppression QRS" });
  }
};
