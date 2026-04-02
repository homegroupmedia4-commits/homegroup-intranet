import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Contact() {

/* ======================
FAQ STATE
====================== */
const [faqCategories, setFaqCategories] = useState([]);
const [faqs, setFaqs] = useState([]);
const [search, setSearch] = useState("");
const [activeCat, setActiveCat] = useState("all");
const [openFaq, setOpenFaq] = useState(null);

  const [qrsCategories, setQrsCategories] = useState([]);

/* ======================
QRS STATE
====================== */
const [isAnon, setIsAnon] = useState(false);
const [prenom, setPrenom] = useState("");
const [nom, setNom] = useState("");
const [message, setMessage] = useState("");
const [selectedCat, setSelectedCat] = useState("Question");
const [qrsList, setQrsList] = useState([]);

/* ======================
LOAD DATA
====================== */
useEffect(() => {
api.get("/contact/faq").then(setFaqs);
api.get("/contact/faq/categories").then(setFaqCategories);
api.get("/contact/qrs/public").then(setQrsList);
api.get("/contact/qrs/categories").then(data => {
  console.log("QRS categories:", data);
  setQrsCategories(Array.isArray(data) ? data : []);
});
}, []);

/* ======================
FILTER FAQ (SAFE)
====================== */
const filteredFaqs = faqs.filter(f =>
(activeCat === "all" || f.category === activeCat) &&
(
(f.question || "").toLowerCase().includes(search.toLowerCase()) ||
(f.answer || "").toLowerCase().includes(search.toLowerCase())
)
);

/* ======================
SUBMIT QRS
====================== */
const handleSubmit = async () => {
  if (!message) return alert("Message requis");

  try {
    const res = await api.post("/contact/qrs", {
      prenom,
      nom,
      isAnon,
      category: selectedCat || "Question",
      message
    });

    if (!res) {
      throw new Error("Réponse API invalide");
    }

    alert("Envoyé ✅");

    setMessage("");
    setPrenom("");
    setNom("");

  } catch (err) {
    console.error("❌ ERREUR SUBMIT:", err);
    alert("Erreur lors de l'envoi");
  }
};

  

/* ======================
FAQ TOGGLE
====================== */
const toggleFaq = (id) => {
setOpenFaq(prev => (prev === id ? null : id));
};

return ( <div className="page active">

```
  <div className="ph">
    <div className="ph-tag">Aide & Échanges</div>
    <h1>Contact</h1>
    <p>Trouvez des réponses dans la FAQ ou posez vos questions.</p>
  </div>

  <div className="contact-layout">

    {/* ======================
        FAQ
    ====================== */}
    <div>

      <h2>❓ Foire aux questions</h2>

      {/* SEARCH */}
      <div className="faq-search-box">
        <span className="faq-si">🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher…"
        />
      </div>

      {/* CATEGORIES */}
      <div className="faq-cat-tabs">
        <button
          className={`fct ${activeCat === "all" ? "active" : ""}`}
          onClick={() => setActiveCat("all")}
        >
          Toutes
        </button>

        {faqCategories.map(cat => (
          <button
              type="button"
            key={cat}
            className={`fct ${activeCat === cat ? "active" : ""}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ LIST */}
      {filteredFaqs.length === 0 && (
        <div style={{ padding: "1rem", color: "var(--ink3)" }}>
          Aucune FAQ trouvée
        </div>
      )}

      {filteredFaqs.map(f => {
        const isOpen = openFaq === f._id;

        return (
          <div key={f._id} className={`faq-item ${isOpen ? "open" : ""}`}>

            {/* QUESTION */}
            <div
              className="faq-q"
              onClick={() => toggleFaq(f._id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleFaq(f._id)}
            >
              <span>{f.question}</span>
              <span className="faq-chevron">▼</span>
            </div>

            {/* ANSWER */}
            <div className="faq-ans">
              <div className="faq-ans-inner">
                {f.answer}
              </div>
            </div>

          </div>
        );
      })}

    </div>

    {/* ======================
        QRS
    ====================== */}
    <div>
      <h2>💬 Questions / Suggestions</h2>

      <p>Exprimez-vous librement.</p>

      {/* TOGGLE */}
      <div className="tgl-wrap" onClick={() => setIsAnon(!isAnon)}>
        <div className={`tgl ${isAnon ? "on" : ""}`}>
          <div className="tgl-knob"></div>
        </div>
        <div>
          <div className="tgl-label">Soumettre anonymement</div>
        </div>
      </div>

      {!isAnon && (
        <div className="row2">
          <input
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prénom"
          />
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
          />
        </div>
      )}

      <label>Catégorie</label>
      <div className="cat-select-grid">
     {(qrsCategories || []).map(cat => (

  
       <button
  key={cat._id}
  type="button"
  className={`csi ${selectedCat === cat.name ? "sel" : ""}`}
  onClick={() => setSelectedCat(cat.name)}
>
  {cat.name}
</button>

  
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre message…"
      />

      <button className="submit-btn" onClick={handleSubmit}>
        Envoyer →
      </button>

      {/* BOARD */}
      <div style={{ marginTop: "1.5rem" }}>
        <h3>Contributions publiées</h3>

        <div className="qrs-board-inner">

          {qrsList.length === 0 && (
            <div>💬 Aucune contribution</div>
          )}

          {qrsList.map(q => (
            <div key={q._id} className="qrs-card">
              <div className="qrs-author">
                {q.isAnon ? "Anonyme" : `${q.prenom} ${q.nom}`}
              </div>
              <div className="qrs-text">{q.message}</div>
            </div>
          ))}

        </div>
      </div>

    </div>

  </div>
</div>


);
}
