import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../config/s3.js";

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
  res.json({
    url: req.file.location
  });
});

export default router;
