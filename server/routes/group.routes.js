const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getGroup,
  updateGroup
} = require("../controllers/group.controller");

/* ======================
   GET GROUP
====================== */
router.get("/", getGroup);

/* ======================
   UPDATE GROUP
====================== */
router.put("/", auth, updateGroup); // ✅ plus logique que POST

module.exports = router;
