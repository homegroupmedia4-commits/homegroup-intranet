const Resource = require("../models/Resource");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const cheerio = require("cheerio");

/* ======================
   EXTRACT PDF TEXT
====================== */
const extractPdfText = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const data = await pdfParse(response.data);
    return data.text?.slice(0, 8000) || "";
  } catch (err) {
    console.error("❌ PDF extract error:", err.message);
    return "";
  }
};

/* ======================
   SCRAPE URL TEXT
====================== */
const scrapeUrl = async (url) => {
  try {
    const { data } = await axios.get(url, { timeout: 8000 });
    const $ = cheerio.load(data);
    $("script, style, nav, footer, header").remove();
    const text = $("body").text().replace(/\s+/g, " ").trim().slice(0, 8000);
    return text;
  } catch (err) {
    console.error("❌ Scrape error:", err.message);
    return "";
  }
};

exports.getResources = async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json(resources);
};

exports.createResource = async (req, res) => {
  try {
    const { type, name, url, content } = req.body;

    let finalContent = content || "";

    // AUTO-EXTRACT selon le type
    if (type === "pdf" && url) {
      console.log("📄 Extraction PDF:", url);
      finalContent = await extractPdfText(url);
    }

    if (type === "url" && url) {
      console.log("🔗 Scraping URL:", url);
      finalContent = await scrapeUrl(url);
    }

    const resource = await Resource.create({
      type,
      name,
      url: url || "",
      content: finalContent
    });

    res.json(resource);

  } catch (err) {
    console.error("❌ createResource:", err);
    res.status(500).json({ error: "Erreur création ressource" });
  }
};

exports.deleteResource = async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id);
  res.json({ message: "Supprimé" });
};
