const express = require("express");

const {
  login,
  forgotPassword,
  resetPassword,
  checkAccessCode
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/check-access-code", checkAccessCode);

module.exports = router;
