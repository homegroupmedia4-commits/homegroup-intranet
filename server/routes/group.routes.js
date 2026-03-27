const express = require("express");
const router = express.Router();

const {
  getGroup,
  updateGroup
} = require("../controllers/group.controller");

router.get("/", getGroup);
router.post("/", updateGroup);

module.exports = router;
