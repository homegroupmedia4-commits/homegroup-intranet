// controllers/contactController.js
import QRS from "../models/QRS.js";
import FAQ from "../models/FAQ.js";

/* FAQ */
export const getFaq = async (req, res) => {
  const data = await FAQ.find();
  res.json(data);
};

export const getFaqCategories = async (req, res) => {
  const cats = await FAQ.distinct("category");
  res.json(cats);
};

/* QRS */
export const createQRS = async (req, res) => {
  const q = new QRS(req.body);
  await q.save();
  res.json({ ok: true });
};

export const getPublicQRS = async (req, res) => {
  const data = await QRS.find({ public: true }).sort({ createdAt: -1 });
  res.json(data);
};

export const getAllQRS = async (req, res) => {
  const data = await QRS.find().sort({ createdAt: -1 });
  res.json(data);
};

export const toggleQRS = async (req, res) => {
  const q = await QRS.findById(req.params.id);
  q.public = !q.public;
  await q.save();
  res.json(q);
};
