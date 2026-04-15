const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const Resource = require("../models/Resource");
const News = require("../models/News");
const FAQ = require("../models/FAQ");
const Group = require("../models/Group");

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const members = await Member.find();
    const resources = await Resource.find();
    const news = await News.find().sort({ createdAt: -1 }).limit(10);
    const faqs = await FAQ.find();
    const group = await Group.findOne();

    // MEMBRES
    const membersContext = members.map(m =>
      `- ${m.name} | ${m.role} | Service: ${m.service} | Société: ${m.company}${m.phone ? " | Tel: " + m.phone : ""}${m.email ? " | Email: " + m.email : ""}`
    ).join("\n");

    // ACTUALITÉS (10 dernières)
    const newsContext = news.map(n =>
      `- [${n.category.toUpperCase()}] ${n.title} (${n.date}) : ${n.body?.slice(0, 200)}`
    ).join("\n");

    // FAQ
    const faqContext = faqs.map(f =>
      `Q: ${f.question}\nR: ${f.answer}`
    ).join("\n\n");

    // GROUPE
    const groupContext = group ? `
Nom du groupe : Home Group
Description : ${group.heroText}
Entités : ${(group.entities || []).map(e => `${e.title} — ${e.description}`).join(" | ")}
Site web : ${group.website?.url}
    `.trim() : "";

    // RESSOURCES
    const resourcesContext = resources.map(r => {
      if (r.type === "url") return `[URL] ${r.name}: ${r.url}`;
      if (r.type === "text") return `[INFO] ${r.name}: ${r.content}`;
      return `[DOC] ${r.name}: ${r.content}`;
    }).join("\n");

    const systemPrompt = `Tu es l'assistant interne du groupe Home Group (intranet collaborateurs).
Tu réponds UNIQUEMENT en te basant sur les informations ci-dessous.
Si tu ne trouves pas la réponse, dis honnêtement que tu ne sais pas et invite l'utilisateur à contacter directement la personne concernée.
Ne jamais inventer une information.

=== GROUPE ===
${groupContext}

=== ÉQUIPES ===
${membersContext}

=== ACTUALITÉS RÉCENTES ===
${newsContext}

=== FAQ ===
${faqContext}

=== RESSOURCES & DOCUMENTS ===
${resourcesContext}

Réponds en français, de manière concise et professionnelle.`;

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.3
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Je ne suis pas en mesure de répondre.";
    res.json({ reply });

  } catch (err) {
    console.error("❌ chat error:", err);
    res.status(500).json({ reply: "Erreur serveur. Contactez l'administrateur." });
  }
});

module.exports = router;
