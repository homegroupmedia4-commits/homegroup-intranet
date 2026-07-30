const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

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
router.post("/", auth, createMember);
router.put("/:id", auth, updateMember);
router.delete("/:id", auth, deleteMember);

module.exports = router;
