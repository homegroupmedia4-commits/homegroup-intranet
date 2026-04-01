const path = require("path");

/* ======================
   ENV (FIX PM2)
====================== */
require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/* ======================
   ROUTES IMPORT
====================== */
const uploadRoutes = require("./routes/upload");
const groupRoutes = require("./routes/group.routes");
const contactRoutes = require("./routes/contactRoutes");
const newsRoutes = require("./routes/news.routes");
const memberRoutes = require("./routes/member.routes"); // ✅ FIX

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/upload", uploadRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/members", memberRoutes); // ✅ FIX CRITIQUE

/* ======================
   TEST
====================== */
app.get("/api", (req, res) => {
  res.json({ message: "Home Group API running 🚀" });
});

/* ======================
   DB CONNECTION (ROBUSTE)
====================== */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI manquant dans .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connecté");
  })
  .catch((err) => {
    console.error("❌ MongoDB erreur :", err);
    process.exit(1); // 🔥 stop propre (évite boucle PM2)
  });

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
