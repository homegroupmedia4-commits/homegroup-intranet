// routes/contactRoutes.js
import express from "express";
import {
  /* FAQ */
  getFaq,
  getFaqCategories,
  createFaq,
  deleteFaq,

  /* QRS */
  createQRS,
  getPublicQRS,
  getAllQRS,
  updateQRSStatus,
  toggleQRSVisibility,
  deleteQRS

} from "../controllers/contactController.js";

const router = express.Router();

/* ======================
   FAQ - PUBLIC
====================== */

// récupérer toutes les FAQ
router.get("/faq", getFaq);

// récupérer les catégories
router.get("/faq/categories", getFaqCategories);


/* ======================
   FAQ - ADMIN
====================== */

// créer une FAQ
router.post("/faq", createFaq);

// supprimer une FAQ
router.delete("/faq/:id", deleteFaq);



/* ======================
   QRS - PUBLIC
====================== */

// envoyer une contribution
router.post("/qrs", createQRS);

// récupérer les contributions publiques
router.get("/qrs/public", getPublicQRS);



/* ======================
   QRS - ADMIN
====================== */

// récupérer toutes les contributions
router.get("/qrs", getAllQRS);

// changer status (pending / approved / rejected)
router.put("/qrs/:id/status", updateQRSStatus);

// rendre public / privé
router.put("/qrs/:id/visibility", toggleQRSVisibility);

// supprimer une contribution
router.delete("/qrs/:id", deleteQRS);


export default router;
