// routes/contactRoutes.js

const express = require("express");
const auth = require("../middleware/auth");

const {
  /* FAQ */
  getFaq,
  getFaqCategories,
  createFaq,
  deleteFaq,
  createFaqCategory,
  deleteFaqCategory,

  /* QRS */
  createQRS,
  getPublicQRS,
  getAllQRS,
  updateQRSStatus,
  toggleQRSVisibility,
  deleteQRS,

  /* QRS CATEGORIES 🔥 */
  getQrsCategories,
  createQrsCategory,
  deleteQrsCategory

} = require("../controllers/contactController");

const router = express.Router();

/* ======================
   FAQ - PUBLIC
===================g=== */

// récupérer toutes les FAQ
router.get("/faq", getFaq);

// récupérer les catégories
router.get("/faq/categories", getFaqCategories);

router.get("/qrs/categories", getQrsCategories);
router.post("/qrs/categories", auth, createQrsCategory);
router.delete("/qrs/categories/:id", auth, deleteQrsCategory);


/* ======================
   FAQ - ADMIN
====================== */

// créer une FAQ
router.post("/faq", auth, createFaq);

// supprimer une FAQ
router.delete("/faq/:id", auth, deleteFaq);


/* ======================
   QRS - PUBLIC
====================== */

// envoyer une contribution
router.post("/qrs", createQRS);

// récupérer les contributions publiques
router.get("/qrs/public", getPublicQRS);

/* ======================
   FAQ CATEGORIES
====================== */

router.post("/faq/categories", auth, createFaqCategory);
router.delete("/faq/categories/:id", auth, deleteFaqCategory);


/* ======================
   QRS - ADMIN
====================== */

// récupérer toutes les contributions
router.get("/qrs", getAllQRS);

// changer status (pending / approved / rejected)
router.put("/qrs/:id/status", auth, updateQRSStatus);

// rendre public / privé
router.put("/qrs/:id/visibility", auth, toggleQRSVisibility);

// supprimer une contribution
router.delete("/qrs/:id", auth, deleteQRS);


module.exports = router;
