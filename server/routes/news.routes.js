const express = require("express");
const router = express.Router();

const {
  createNews,
  getNews,
  deleteNews,
    togglePin
} = require("../controllers/news.controller");

// CREATE
router.post("/", createNews);

// GET
router.get("/", getNews);

// DELETE
router.delete("/:id", deleteNews);

// PIN
router.put("/:id/pin", togglePin);

module.exports = router;
