const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Admin = require("../models/Admin");
const { sendResetPasswordEmail } = require("../services/mail");

const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

/* ======================
   LOGIN
====================== */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        error: "Email invalide"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Mot de passe invalide"
      });
    }

    const token = generateToken(admin);

    res.json({
      token,
      admin: {
        email: admin.email
      }
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
};

/* ======================
   FORGOT PASSWORD
====================== */

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.json({
        ok: true
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    admin.resetToken = token;
    admin.resetTokenExpire = Date.now() + 1000 * 60 * 30;

    await admin.save();

    await sendResetPasswordEmail(email, token);

    res.json({
      ok: true
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
};

/* ======================
   RESET PASSWORD
====================== */

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({
        error: "Token invalide"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    admin.password = hashed;
    admin.resetToken = undefined;
    admin.resetTokenExpire = undefined;

    await admin.save();

    res.json({
      ok: true
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erreur serveur"
    });
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword
};
