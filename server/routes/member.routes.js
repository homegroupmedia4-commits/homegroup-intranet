const express = require("express");
const router = express.Router();

const {
  getMembers,
  createMember,
  updateMember,
  deleteMember
} = require("../controllers/memberController");

/* ======================
   MEMBERS
====================== */

router.get("/", getMembers);
router.post("/", createMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

module.exports = router;
