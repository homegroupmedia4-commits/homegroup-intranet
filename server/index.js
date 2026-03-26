require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Test = require("./models/Test");
const News = require("./models/News");

const app = express();

app.use(cors());
app.use(express.json());

/* ======================
   TEST DB (WRITE)
====================== */
app.get("/api/test-save", async (req, res) => {
  try {
    const newDoc = new Test({
      message: "Test HomeGroup OK 🚀"
    });

    await newDoc.save();

    res.json({
      ok: true,
      data: newDoc
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});

/* ======================
   🔌 CONNEXION MONGODB
====================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ MongoDB erreur :", err));

/* ======================
   ROUTES
====================== */
app.get("/api", (req, res) => {
  res.json({ message: "Home Group API running 🚀" });
});

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
