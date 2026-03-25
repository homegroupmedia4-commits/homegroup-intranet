export default function Organisation() {
  return (
    <div className="page active">

      {/* HEADER */}
      <div className="ph">
        <div className="ph-tag">Qui fait quoi</div>
        <h1>Notre Organisation</h1>
        <p>
          Retrouvez les équipes et les rôles de chaque entité.
        </p>
      </div>

      {/* CHATBOT */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div className="api-notice">
          ⚠️ Clé API non configurée. Mode démo actif.
        </div>

        <div className="chat-container">

          <div className="chat-hdr">
            <img src="/logo.png" alt="logo" />
            <div className="chat-dot"></div>

            <div className="chat-hdr-info">
              <h3>Assistant — Qui fait quoi ?</h3>
              <p>Questions sur l'organisation</p>
            </div>
          </div>

          <div className="chat-msgs">
            <div className="msg bot">
              <div className="msg-lbl">Assistant</div>
              <div className="msg-bubble">
                Bonjour ! Posez-moi vos questions 👋
              </div>
            </div>
          </div>

          {/* QUICK BUTTONS */}
          <div className="chat-quick">
            <button className="qr-btn">Qui gère la logistique ?</button>
            <button className="qr-btn">Contact Service Marché</button>
            <button className="qr-btn">Organisation MP Renov</button>
          </div>

          {/* INPUT */}
          <div className="chat-input-row">
            <input
              type="text"
              className="chat-input"
              placeholder="Votre question…"
            />
            <button className="chat-send">➤</button>
          </div>

        </div>
      </div>

      {/* FILTRES */}
      <div className="company-filter">
        <button className="cf-pill active">🏢 Tout le groupe</button>
        <button className="cf-pill">👑 Direction</button>
        <button className="cf-pill">🔨 MP Renov</button>
        <button className="cf-pill">🏠 Home Design</button>
        <button className="cf-pill">📺 Media4</button>
      </div>

      {/* SERVICES */}
      <div>
        {/* TODO: composants services */}
      </div>

      {/* ORGANIGRAMME */}
      <div className="org-chart-container">
        <div className="org-chart-header">
          <h2>📊 Organigramme</h2>
          <div className="org-update-date">
            🕐 Mis à jour : Janvier 2026
          </div>
        </div>

        <div className="org-tree">
          {/* TODO: organigramme dynamique */}
        </div>
      </div>

    </div>
  );
}