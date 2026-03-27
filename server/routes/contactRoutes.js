// routes/contactRoutes.js
import express from "express";
import {
  getFaq,
  getFaqCategories,
  createQRS,
  getPublicQRS,
  getAllQRS,
  toggleQRS
} from "../controllers/contactController.js";

const router = express.Router();

/* FAQ */
router.get("/faq", getFaq);
router.get("/faq/categories", getFaqCategories);

/* QRS */
router.post("/qrs", createQRS);
router.get("/qrs/public", getPublicQRS);
router.get("/qrs", getAllQRS);
router.put("/qrs/:id/toggle", toggleQRS);

export default router;
