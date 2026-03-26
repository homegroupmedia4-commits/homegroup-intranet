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

module.exports = router;
