const express = require("express");
const router = express.Router();

const {
  createNews,
  getNews,
  deleteNews
} = require("../controllers/news.controller");

// CREATE
router.post("/", createNews);

// GET
router.get("/", getNews);

// DELETE
router.delete("/:id", deleteNews);

router.put("/:id/pin", async (req, res) => {
  const news = await require("../models/News").findById(req.params.id);

  news.pinned = !news.pinned;
  await news.save();

  res.json(news);
});

module.exports = router;
