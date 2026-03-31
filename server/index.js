require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env")
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const uploadRoutes = require("./routes/upload");
const groupRoutes = require("./routes/group.routes");
const contactRoutes = require("./routes/contactRoutes");
const newsRoutes = require("./routes/news.routes");
const memberRoutes = require("./routes/member.routes");

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
app.use("/api/members", memberRoutes);
app.use("/api/news", newsRoutes);

/* ======================
   DB
====================== */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI manquant");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => {
    console.error("❌ MongoDB erreur :", err);
    process.exit(1);
  });

/* ======================
   TEST
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
