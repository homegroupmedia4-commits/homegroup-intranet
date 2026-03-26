const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3 } = require("../config/s3");

const router = express.Router();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "homegroup-media",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName = `news/${Date.now()}-${file.originalname.replace(/\s/g, "")}`;
      cb(null, fileName);
    }
  })
});

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.error("❌ Aucun fichier reçu");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("✅ FILE:", req.file);

  res.json({
    url: req.file.location
  });
});

module.exports = router;
