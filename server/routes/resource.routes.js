const express = require("express");
const router = express.Router();
const { getResources, createResource, deleteResource } = require("../controllers/resourceController");

router.get("/", getResources);
router.post("/", createResource);
router.delete("/:id", deleteResource);

module.exports = router;
