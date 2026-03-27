import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Groupe() {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    api.get("/group").then(setGroup);
  }, []);

  if (!group) return <div>Chargement...</div>;

  const years = new Date().getFullYear() - (group.startYear || 2004);

  return (
    <div className="page active">

      {/* HEADER */}
      <div className="ph">
        <div className="ph-tag">À propos</div>
        <h1>Notre Groupe</h1>
        <p>Découvrez l'univers Home Group et ses entités spécialisées.</p>
      </div>

      {/* HERO */}
      <div className="groupe-hero">
        <img src="/logo.png" alt="Home Group" />

        <h2>{years} ans d'expérience à votre service</h2>

        <p>{group.heroText}</p>
      </div>

      {/* ENTITÉS */}
      <div className="groupe-entities">
        {group.entities.map((e, i) => (
          <div key={i} className="entity-card">

            <div
              className="entity-badge"
              style={{
                background: e.badgeColor,
                color: e.badgeTextColor
              }}
            >
              {e.icon} {e.badgeText}
            </div>

            <div className="entity-name">{e.title}</div>

            <div className="entity-desc">{e.description}</div>

            <a
              className="entity-link"
              href={e.url}
              target="_blank"
              rel="noreferrer"
            >
              🔗 {e.url.replace("https://", "").replace("http://", "")}
            </a>

          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="groupe-hero" style={{ padding: "2rem" }}>
        <h3 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "1.3rem",
          marginBottom: "1.5rem",
          color: "var(--green2)"
        }}>
          Le groupe en chiffres
        </h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "1.5rem"
        }}>

          <div>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green2)" }}>
              {years}
            </div>
            <div style={{ fontSize: ".82rem", opacity: 0.6 }}>
              ans d'expérience
            </div>
          </div>

          <div>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green2)" }}>
              {group.entities.length}
            </div>
            <div style={{ fontSize: ".82rem", opacity: 0.6 }}>
              entités spécialisées
            </div>
          </div>

          <div>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green2)" }}>
              360°
            </div>
            <div style={{ fontSize: ".82rem", opacity: 0.6 }}>
              offre complète
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
