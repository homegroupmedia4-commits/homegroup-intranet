const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3 } = require("../config/s3");

const router = express.Router();

/* ======================
   CLEAN FILENAME
====================== */
function cleanFileName(name) {
  return name
    .normalize("NFD") // supprime accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .replace(/[^\w.-]/g, "");
}

/* ======================
   CONFIG MULTER + S3
====================== */
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "homegroup-media",
    acl: "public-read", // ✅ CRITIQUE (sinon image inaccessible)
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const cleanName = cleanFileName(file.originalname);
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

    // ✅ URL publique OVH (IMPORTANT)
    const publicUrl = `https://homegroup-media.s3.eu-west-par.io.cloud.ovh.net/${req.file.key}`;

    console.log("✅ Upload réussi:", publicUrl);

    res.json({
      url: publicUrl
    });
  });
});

module.exports = router;
