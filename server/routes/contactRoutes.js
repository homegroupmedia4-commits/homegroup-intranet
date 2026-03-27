// routes/contactRoutes.js
import express from "express";
import {
  getFaq,
  getFaqCategories,

  createQRS,
  getPublicQRS,

  getAllQRS,
  updateQRSStatus,
  toggleQRSVisibility,
  deleteQRS

} from "../controllers/contactController.js";

const router = express.Router();

/* ======================
   FAQ
====================== */
router.get("/faq", getFaq);
router.get("/faq/categories", getFaqCategories);

/* ======================
   QRS - PUBLIC
====================== */
router.post("/qrs", createQRS);
router.get("/qrs/public", getPublicQRS);

/* ======================
   QRS - ADMIN
====================== */
router.get("/qrs", getAllQRS);

// ✅ changer status (pending / approved / rejected)
router.put("/qrs/:id/status", updateQRSStatus);

// ✅ rendre public / privé
router.put("/qrs/:id/visibility", toggleQRSVisibility);

// ✅ suppression
router.delete("/qrs/:id", deleteQRS);

export default router;
