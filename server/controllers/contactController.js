// controllers/contactController.js

const QRS = require("../models/QRS");
const FAQ = require("../models/FAQ");
const mongoose = require("mongoose");

/* ======================
   FAQ CATEGORY MODEL
====================== */
const faqCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

const FaqCategory =
  mongoose.models.FaqCategory ||
  mongoose.model("FaqCategory", faqCategorySchema);

/* ======================
   FAQ
====================== */

// GET all FAQ
const getFaq = async (req, res) => {
  try {
    const data = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("❌ getFaq:", err);
    res.status(500).json({ error: "Erreur serveur FAQ" });
  }
};

/* ======================
   FAQ CATEGORIES
====================== */

// GET categories
const getFaqCategories = async (req, res) => {
  try {
    const cats = await FaqCategory.find().sort({ name: 1 });
    res.json(cats.map(c => c.name));
  } catch (err) {
    console.error("❌ getFaqCategories:", err);
    res.status(500).json({ error: "Erreur catégories FAQ" });
  }
};

// CREATE category
const createFaqCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Nom requis" });
    }

    const cat = await FaqCategory.create({
      name: name.trim()
    });

    res.json(cat);
  } catch (err) {
    console.error("❌ createFaqCategory:", err);
    res.status(500).json({ error: "Erreur création catégorie" });
  }
};

// DELETE category
const deleteFaqCategory = async (req, res) => {
  try {
    await FaqCategory.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ deleteFaqCategory:", err);
    res.status(500).json({ error: "Erreur suppression catégorie" });
  }
};

/* ======================
   FAQ CRUD
====================== */

// CREATE FAQ
const createFaq = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Champs requis" });
    }

    const cleanCategory = category?.trim() || "Général";

    // ✅ synchro auto catégorie
    await FaqCategory.findOneAndUpdate(
      { name: cleanCategory },
      { name: cleanCategory },
      { upsert: true }
    );

    const faq = new FAQ({
      question,
      answer,
      category: cleanCategory
    });

    await faq.save();
    res.json(faq);
  } catch (err) {
    console.error("❌ createFaq:", err);
    res.status(500).json({ error: "Erreur création FAQ" });
  }
};

// DELETE FAQ
const deleteFaq = async (req, res) => {
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

// CREATE
const createQRS = async (req, res) => {
  try {
    const {
      prenom = "",
      nom = "",
      isAnon = false,
      category = "Question",
      message
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message requis" });
    }

    const q = await QRS.create({
      prenom: isAnon ? "" : prenom.trim(),
      nom: isAnon ? "" : nom.trim(),
      isAnon,
      category,
      message: message.trim(),
      status: "pending",
      public: false
    });

    res.json(q);
  } catch (err) {
    console.error("❌ createQRS:", err);
    res.status(500).json({ error: "Erreur création QRS" });
  }
};

// GET public
const getPublicQRS = async (req, res) => {
  try {
    const data = await QRS.find({ public: true }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("❌ getPublicQRS:", err);
    res.status(500).json({ error: "Erreur QRS public" });
  }
};

// GET all
const getAllQRS = async (req, res) => {
  try {
    const data = await QRS.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("❌ getAllQRS:", err);
    res.status(500).json({ error: "Erreur QRS admin" });
  }
};

// UPDATE status
const updateQRSStatus = async (req, res) => {
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

// TOGGLE visibility
const toggleQRSVisibility = async (req, res) => {
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

// DELETE
const deleteQRS = async (req, res) => {
  try {
    await QRS.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ deleteQRS:", err);
    res.status(500).json({ error: "Erreur suppression QRS" });
  }
};

module.exports = {
  getFaq,
  getFaqCategories,
  createFaq,
  deleteFaq,
  createFaqCategory,
  deleteFaqCategory,
  createQRS,
  getPublicQRS,
  getAllQRS,
  updateQRSStatus,
  toggleQRSVisibility,
  deleteQRS
};
