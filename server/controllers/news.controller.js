const News = require("../models/News");

// CREATE
exports.createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();

    res.json({ ok: true, data: news });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET
exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({
      pinned: -1,
      createdAt: -1
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
