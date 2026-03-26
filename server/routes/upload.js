const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3 } = require("../config/s3");

const router = express.Router();

/* ======================
   CONFIG MULTER + S3
====================== */
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "homegroup-media",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const cleanName = file.originalname.replace(/\s/g, "");
      const fileName = `news/${Date.now()}-${cleanName}`;
      cb(null, fileName);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

/* ======================
   ROUTE UPLOAD
====================== */
router.post("/", (req, res) => {
  upload.single("file")(req, res, (err) => {
    // ❌ erreur multer / S3
    if (err) {
      console.error("❌ Erreur upload:", err);
      return res.status(500).json({
        error: "Upload failed",
        details: err.message
      });
    }

    // ❌ aucun fichier
    if (!req.file) {
      console.error("❌ Aucun fichier reçu");
      return res.status(400).json({
        error: "No file uploaded"
      });
    }

    // ✅ succès
    console.log("✅ Upload réussi:", req.file.location);

    res.json({
      url: req.file.location
    });
  });
});

module.exports = router;
