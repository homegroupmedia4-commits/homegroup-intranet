import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Organisation() {

  const [members, setMembers] = useState([]);
  const [activeCompany, setActiveCompany] = useState("all");

  /* ======================
     SERVICES (avec couleurs)
  ====================== */
  const services = [
    { id: "direction", name: "Direction", icon: "🏛️", color: "#c9a84c", bg: "#fff8e1" },
    { id: "administratif", name: "Administratif", icon: "📋", color: "#9c27b0", bg: "#f3e5f5" },
    { id: "marche", name: "Marché", icon: "📈", color: "#2196f3", bg: "#e3f2fd" },
    { id: "travaux", name: "Travaux", icon: "🔨", color: "#ff9800", bg: "#fff3e0" },
    { id: "logistique", name: "Logistique", icon: "🚚", color: "#4caf50", bg: "#e8f5e9" }
  ];

  /* ======================
     FETCH API (IMPORTANT)
  ====================== */
  useEffect(() => {
    api.get("/members").then((data) => {
      setMembers(Array.isArray(data) ? data : []);
    });
  }, []);

  /* ======================
     HELPERS
  ====================== */
  const companyLabel = (c) => {
    return {
      homegroup: "Home Group",
      mprenov: "MP Renov",
      homedesign: "Home Design",
      media4: "Media4"
    }[c] || c;
  };

  const filteredMembers = members.filter((m) => {
    if (activeCompany === "all") return true;
    return m.company === activeCompany;
  });

  const getMembersByService = (serviceId) => {
    return filteredMembers.filter((m) => m.service === serviceId);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
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
        <p>Retrouvez les équipes et les rôles de chaque entité.</p>
      </div>

      {/* FILTRES */}
      <div className="company-filter">
        {[
          ["all", "🏢 Tout le groupe"],
          ["homegroup", "👑 Direction"],
          ["mprenov", "🔨 MP Renov"],
          ["homedesign", "🏠 Home Design"],
          ["media4", "📺 Media4"]
        ].map(([id, label]) => (
          <button
            key={id}
            className={`cf-pill ${activeCompany === id ? "active" : ""}`}
            onClick={() => setActiveCompany(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* SERVICES */}
      {services.map((svc) => {
        const svcMembers = getMembersByService(svc.id);
        if (!svcMembers.length) return null;

        return (
          <div key={svc.id} className="service-section">

            <div className="svc-header">
              <div
                className="svc-icon"
                style={{ background: svc.bg, color: svc.color }}
              >
                {svc.icon}
              </div>

              <div>
                <div className="svc-name">{svc.name}</div>
              </div>
            </div>

            <div className="member-grid">
              {svcMembers.map((m) => (
                <div key={m._id} className="member-card">

                  {/* TOP */}
                  <div className="mc-top">
                    <div
                      className="mc-avatar"
                      style={{ background: svc.color }}
                    >
                      {getInitials(m.name)}
                    </div>

                    <div>
                      <div className="mc-name">{m.name}</div>
                      <div className="mc-role">{m.role}</div>
                    </div>
                  </div>

                  {/* BADGE */}
                  <div className="member-badge">
                    {companyLabel(m.company)} • {svc.name}
                  </div>

                  {/* DESCRIPTION */}
                  <div className={`mc-desc ${!m.desc ? "placeholder" : ""}`}>
                    {m.desc || "Aucune description disponible"}
                  </div>

                  {/* CONTACT */}
                  {(m.phone || m.email) && (
                    <div style={{ marginTop: 6, fontSize: ".75rem" }}>
                      {m.phone && <div>📞 {m.phone}</div>}
                      {m.email && <div>✉️ {m.email}</div>}
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        );
      })}

      {/* ORGANIGRAMME */}
      <div className="org-chart-container">

        <div className="org-chart-header">
          <h2>📊 Organigramme</h2>
          <div className="org-update-date">
            🕐 {new Date().toLocaleDateString()}
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
