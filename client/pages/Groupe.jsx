import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Groupe() {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    loadGroup();
  }, []);

  const loadGroup = async () => {
    try {
      const data = await api.get("/group");

      // ✅ sécurisation front (important même si admin OK)
    setGroup({
  ...data,

  stats: {
    experienceValue: "22",
    experienceLabel: "ans d'expérience",

    entitiesValue: "3",
    entitiesLabel: "entités spécialisées",

    offerValue: "360°",
    offerLabel: "offre complète",

    ...(data.stats || {})
  },

  website: {
    url: "https://home-group.fr",
    label: "Site web officiel",
    description: "Retrouvez toutes nos actualités sur",

    ...(data.website || {})
  }
});

      

    } catch (err) {
      console.error("❌ load group:", err);
    }
  };

  if (!group) return <div>Chargement...</div>;

  /* ======================
     YEARS AUTO CALCUL
  ====================== */
  const currentYear = new Date().getFullYear();
  const years = currentYear - (group.startYear || 2004);

  /* ======================
     SAFE URL FORMAT
  ====================== */
  const cleanUrl = (url) =>
    (url || "").replace("https://", "").replace("http://", "");

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
        <img src="/logo.jpg" alt="Home Group" />

        <h2>
   {group.stats.experienceValue || years} {group.stats.experienceLabel}  à votre service
        </h2>

        <p>{group.heroText}</p>
      </div>

      {/* ENTITÉS */}
      <div className="groupe-entities">
        {(group.entities || []).map((e, i) => (
          <div key={i} className="entity-card">

            <div
              className="entity-badge"
              style={{
                background: e.badgeColor || "#eee",
                color: e.badgeTextColor || "#000"
              }}
            >
              {e.icon || "🏢"} {e.badgeText}
            </div>

            <div className="entity-name">{e.title}</div>

            <div className="entity-desc">{e.description}</div>

            <a
              className="entity-link"
              href={e.url}
              target="_blank"
              rel="noreferrer"
            >
              🔗 {cleanUrl(e.url)}
            </a>

          </div>
        ))}
      </div>

{/* STATS */}
<div className="groupe-hero" style={{ padding: "2rem" }}>
  <h3
    style={{
      fontFamily: "'DM Serif Display', serif",
      fontSize: "1.3rem",
      marginBottom: "1.5rem",
      color: "var(--green2)"
    }}
  >
    Le groupe en chiffres
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
      gap: "1.5rem"
    }}
  >

    {/* EXPERIENCE */}
    <div>
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green2)" }}>
        {group.stats.experienceValue || years}
      </div>
      <div style={{ fontSize: ".82rem", opacity: 0.6 }}>
        {group.stats.experienceLabel}
      </div>
    </div>

    {/* ENTITIES */}
    <div>
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green2)" }}>
        {group.stats.entitiesValue || (group.entities || []).length}
      </div>
      <div style={{ fontSize: ".82rem", opacity: 0.6 }}>
        {group.stats.entitiesLabel}
      </div>
    </div>

    {/* OFFER */}
    <div>
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green2)" }}>
        {group.stats.offerValue}
      </div>
      <div style={{ fontSize: ".82rem", opacity: 0.6 }}>
        {group.stats.offerLabel}
      </div>
    </div>

  </div>
</div>

      




      {/* WEBSITE */}
<div
  style={{
    marginTop: "1.2rem",
    padding: "1.1rem",
    background: "#fff",
    borderRadius: "var(--r)",
    border: "1px solid var(--border)",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  }}
>
  <span style={{ fontSize: "1.4rem" }}>🌐</span>

  <div>
    <div style={{ fontWeight: 600, fontSize: ".9rem" }}>
      {group.website.label}
    </div>
    <div style={{ fontSize: ".81rem", color: "var(--ink3)" }}>
      {group.website.description}
    </div>
  </div>

  {group.website.url && (
    <a
      href={group.website.url}
      target="_blank"
      rel="noreferrer"
      className="entity-link"
      style={{ marginLeft: "auto", whiteSpace: "nowrap" }}
    >
      {cleanUrl(group.website.url)} →
    </a>
  )}
</div>

      
      

    </div>
  );
}
