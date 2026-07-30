const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getResources, createResource, deleteResource } = require("../controllers/resourceController");

router.get("/", getResources);
router.post("/", auth, createResource);
router.delete("/:id", auth, deleteResource);

module.exports = router;
