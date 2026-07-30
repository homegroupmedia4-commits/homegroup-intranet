const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createNews,
  getNews,
  deleteNews,
    togglePin
} = require("../controllers/news.controller");

// CREATE
router.post("/", auth, createNews);

// GET
router.get("/", getNews);

// DELETE
router.delete("/:id", auth, deleteNews);

// PIN
router.put("/:id/pin", auth, togglePin);

module.exports = router;
