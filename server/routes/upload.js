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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .replace(/[^\w.-]/g, "");
}

/* ======================
   FILTER (images + PDF)
====================== */
function fileFilter(req, file, cb) {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf"
  ];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only images and PDFs are allowed"), false);
  }

  cb(null, true);
}

/* ======================
   CONFIG MULTER + S3
====================== */
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "homegroup-media",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const cleanName = cleanFileName(file.originalname);
      const folder = file.mimetype === "application/pdf" ? "documents" : "news";
      const fileName = `${folder}/${Date.now()}-${cleanName}`;
      cb(null, fileName);
    }
  }),
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB (images + PDF)
  },
  fileFilter
});

/* ======================
   ROUTE UPLOAD
====================== */
router.post("/", (req, res) => {
  upload.single("file")(req, res, (err) => {

    if (err instanceof multer.MulterError) {
      console.error("❌ Multer error:", err);
      return res.status(400).json({
        error: "Upload error",
        details: err.message
      });
    } else if (err) {
      console.error("❌ Upload error:", err);
      return res.status(500).json({
        error: err.message
      });
    }

    if (!req.file) {
      console.error("❌ Aucun fichier reçu");
      return res.status(400).json({
        error: "No file uploaded"
      });
    }

    const publicUrl = `https://homegroup-media.s3.eu-west-par.io.cloud.ovh.net/${req.file.key}`;

    console.log("✅ Upload réussi:");
    console.log("➡️ Key:", req.file.key);
    console.log("➡️ URL:", publicUrl);

    return res.json({
      url: publicUrl
    });
  });
});

module.exports = router;
