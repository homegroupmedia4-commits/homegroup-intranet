require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/upload");
const groupRoutes = require("./routes/group.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/group", groupRoutes);
/* ======================
   🔌 DB
====================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ MongoDB erreur :", err));

/* ======================
   ROUTES
====================== */
const newsRoutes = require("./routes/news.routes");

app.use("/api/news", newsRoutes);

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
