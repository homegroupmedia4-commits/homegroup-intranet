import { useState } from "react";

export default function Contact() {
  const [isAnon, setIsAnon] = useState(false);

  return (
    <div className="page active">

      {/* HEADER */}
      <div className="ph">
        <div className="ph-tag">Aide & Échanges</div>
        <h1>Contact</h1>
        <p>
          Trouvez des réponses dans la FAQ ou posez vos questions.
        </p>
      </div>

      <div className="contact-layout">

        {/* FAQ */}
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.35rem", marginBottom: "1rem" }}>
            ❓ Foire aux questions
          </h2>

          <div className="faq-search-box">
            <span className="faq-si">🔍</span>
            <input type="text" placeholder="Rechercher…" />
          </div>

          <div className="faq-cat-tabs">
            {/* TODO */}
          </div>

          <div>
            {/* TODO FAQ */}
          </div>
        </div>

        {/* QRS */}
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.35rem" }}>
            💬 Questions / Suggestions
          </h2>

          <p style={{ fontSize: ".83rem", color: "var(--ink2)", marginBottom: "1.2rem" }}>
            Exprimez-vous librement.
          </p>

          {/* TOGGLE */}
          <div
            className="tgl-wrap"
            onClick={() => setIsAnon(!isAnon)}
          >
            <div className={`tgl ${isAnon ? "on" : ""}`}>
              <div className="tgl-knob"></div>
            </div>

            <div>
              <div className="tgl-label">Soumettre anonymement</div>
              <div className="tgl-sub">Votre nom restera masqué</div>
            </div>
          </div>

          {/* NOM */}
          {!isAnon && (
            <div className="row2">
              <input type="text" placeholder="Prénom" />
              <input type="text" placeholder="Nom" />
            </div>
          )}

          {/* CAT */}
          <label>Catégorie</label>
          <div className="cat-select-grid">
            <button className="csi">Question</button>
            <button className="csi">Suggestion</button>
            <button className="csi">Bug</button>
            <button className="csi">Autre</button>
          </div>

          {/* MESSAGE */}
          <textarea placeholder="Votre message…" />

          {/* BTN */}
          <button className="submit-btn">
            Envoyer →
          </button>

          {/* BOARD */}
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ fontSize: ".85rem" }}>
              Contributions publiées
            </h3>

            <div className="qrs-board-inner">
              <div style={{ textAlign: "center", padding: "2rem" }}>
                💬 Aucune contribution
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}