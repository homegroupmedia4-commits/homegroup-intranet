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
}, []);

  /* ======================
     FILTER FAQ
  ====================== */
  const filteredFaqs = faqs.filter(f =>
    (activeCat === "all" || f.category === activeCat) &&
    (f.question.toLowerCase().includes(search.toLowerCase()) ||
     f.answer.toLowerCase().includes(search.toLowerCase()))
  );

  /* ======================
     SUBMIT QRS
  ====================== */
  const handleSubmit = async () => {
    if (!message) return alert("Message requis");

 await api.post("/contact/qrs", {
  prenom,
  nom,
  isAnon,
  category: selectedCat,
  message
});

    alert("Envoyé ✅");

    setMessage("");
    setPrenom("");
    setNom("");
  };

  return (
    <div className="page active">

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

          <div className="faq-search-box">
            <span className="faq-si">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher…"
            />
          </div>

          <div className="faq-cat-tabs">
            <button
              className={`fct ${activeCat === "all" ? "active" : ""}`}
              onClick={() => setActiveCat("all")}
            >
              Toutes
            </button>

            {faqCategories.map(cat => (
              <button
                key={cat}
                className={`fct ${activeCat === cat ? "active" : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div>
            {filteredFaqs.map(f => (
              <div key={f._id} className="faq-item">
                <div className="faq-q">{f.question}</div>
                <div className="faq-ans">
                  <div className="faq-ans-inner">{f.answer}</div>
                </div>
              </div>
            ))}
          </div>
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
            {["Question","Suggestion","Amélioration","Problème","Autre"].map(cat => (
              <button
                key={cat}
                className={`csi ${selectedCat === cat ? "sel" : ""}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
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
