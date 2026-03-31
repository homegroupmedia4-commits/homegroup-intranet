import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Organisation() {

  /* ======================
     STATE
  ====================== */
  const [members, setMembers] = useState([]);
  const [activeCompany, setActiveCompany] = useState("all");

  /* ======================
     SERVICES CONFIG
  ====================== */
  const services = [
    { id: "direction", name: "Direction", icon: "🏛️" },
    { id: "administratif", name: "Administratif", icon: "📋" },
    { id: "marche", name: "Marché", icon: "📈" },
    { id: "travaux", name: "Travaux", icon: "🔨" },
    { id: "logistique", name: "Logistique", icon: "🚚" }
  ];

  /* ======================
     FETCH MEMBERS
  ====================== */
  useEffect(() => {
    api.get("/members").then(setMembers);
  }, []);

  /* ======================
     FILTER
  ====================== */
  const filteredMembers = members.filter(m => {
    if (activeCompany === "all") return true;
    return m.company === activeCompany;
  });

  const getMembersByService = (serviceId) => {
    return filteredMembers.filter(m => m.service === serviceId);
  };

  /* ======================
     UI
  ====================== */
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

          <div className="chat-quick">
            <button className="qr-btn">Qui gère la logistique ?</button>
            <button className="qr-btn">Contact Service Marché</button>
            <button className="qr-btn">Organisation MP Renov</button>
          </div>

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
        <button
          className={`cf-pill ${activeCompany === "all" ? "active" : ""}`}
          onClick={() => setActiveCompany("all")}
        >
          🏢 Tout le groupe
        </button>

        <button
          className={`cf-pill ${activeCompany === "homegroup" ? "active" : ""}`}
          onClick={() => setActiveCompany("homegroup")}
        >
          👑 Direction
        </button>

        <button
          className={`cf-pill ${activeCompany === "mprenov" ? "active" : ""}`}
          onClick={() => setActiveCompany("mprenov")}
        >
          🔨 MP Renov
        </button>

        <button
          className={`cf-pill ${activeCompany === "homedesign" ? "active" : ""}`}
          onClick={() => setActiveCompany("homedesign")}
        >
          🏠 Home Design
        </button>

        <button
          className={`cf-pill ${activeCompany === "media4" ? "active" : ""}`}
          onClick={() => setActiveCompany("media4")}
        >
          📺 Media4
        </button>
      </div>

      {/* SERVICES */}
      <div>
        {services.map((svc) => {
          const svcMembers = getMembersByService(svc.id);

          if (!svcMembers.length) return null;

          return (
            <div key={svc.id} className="service-section">

              <div className="svc-header">
                <div className="svc-icon">{svc.icon}</div>
                <div className="svc-name">{svc.name}</div>
              </div>

              <div className="member-grid">
                {svcMembers.map((m) => (
                  <div key={m._id} className="member-card">

                    <div className="mc-top">
                      <div className="mc-avatar">
                        {m.name?.slice(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <div className="mc-name">{m.name}</div>
                        <div className="mc-role">{m.role}</div>
                      </div>
                    </div>

                    <div className="mc-desc">
                      {m.desc || "Aucune description disponible"}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* ORGANIGRAMME SIMPLE */}
      <div className="org-chart-container">

        <div className="org-chart-header">
          <h2>📊 Organigramme</h2>
          <div className="org-update-date">
            🕐 Mis à jour : {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="org-tree">

          {services.map((svc) => {
            const svcMembers = getMembersByService(svc.id);

            if (!svcMembers.length) return null;

            return (
              <div key={svc.id} className="org-service-block">

                <div className="org-service-title">
                  {svc.icon} {svc.name}
                </div>

                {svcMembers.map((m) => (
                  <div key={m._id} className="org-member-item">
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </div>
                ))}

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}
