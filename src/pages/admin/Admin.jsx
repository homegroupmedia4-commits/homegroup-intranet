import { useState } from "react";

export default function Admin() {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="page active">

      {/* HEADER */}
      <div className="ph">
        <div className="ph-tag">Administration</div>
        <h1>Panneau d'administration</h1>
        <p>Gérez l'ensemble du contenu.</p>
      </div>

      <div className="admin-grid">

        {/* API KEY */}
        <div className="a-card">
          <h3>🔑 Clé API Anthropic</h3>
          <p className="sub">Active l'assistant IA</p>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-…"
              style={{ flex: 1 }}
            />

            <button className="btn btn-green">
              Enregistrer
            </button>
          </div>
        </div>

        {/* EMAILS */}
        <div className="a-card">
          <h3>📧 Emails de réception</h3>

          <div className="email-row">
            <label>Améliorations</label>
            <input type="email" placeholder="rh@homegroup.fr" />
          </div>

          <div className="email-row">
            <label>Problèmes</label>
            <input type="email" placeholder="direction@homegroup.fr" />
          </div>

          <button className="btn btn-green btn-sm">
            Enregistrer
          </button>
        </div>

        {/* DOCUMENTS */}
        <div className="a-card">
          <h3>📁 Documents</h3>

          <ul className="doc-list">
            <li className="doc-item">
              📊 ORGANIGRAMME.pdf
            </li>
          </ul>

          <div className="upload-zone">
            📎 Ajouter fichier
          </div>
        </div>

        {/* ACTUALITÉS */}
        <div className="a-card">
          <h3>📢 Actualités</h3>

          <input type="text" placeholder="Titre..." />
          <textarea placeholder="Contenu..." />

          <button className="btn btn-green btn-sm">
            Publier
          </button>
        </div>

        {/* FAQ */}
        <div className="a-card">
          <h3>❓ FAQ</h3>

          <input type="text" placeholder="Question..." />
          <textarea placeholder="Réponse..." />

          <button className="btn btn-green btn-sm">
            Ajouter
          </button>
        </div>

        {/* QRS */}
        <div className="a-card">
          <h3>💬 Contributions</h3>

          <div style={{ fontSize: ".8rem", color: "var(--ink3)" }}>
            Aucune donnée pour le moment
          </div>
        </div>

      </div>
    </div>
  );
}