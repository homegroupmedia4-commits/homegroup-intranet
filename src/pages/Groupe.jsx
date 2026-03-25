export default function Groupe() {
  return (
    <div className="page active">

      {/* HEADER PAGE */}
      <div className="ph">
        <div className="ph-tag">À propos</div>
        <h1>Notre Groupe</h1>
        <p>
          Découvrez l'univers Home Group et ses entités spécialisées.
        </p>
      </div>

      {/* HERO */}
      <div className="groupe-hero">
        <img src="/logo.png" alt="Home Group" />

        <h2>22 ans d'expérience à votre service</h2>
        <p>
          De la construction à l'équipement des habitations{" "}
          <strong>HOME GROUP</strong> vous propose une offre 360° grâce à ses
          différentes structures.
        </p>
      </div>

      {/* ENTITÉS */}
      <div className="groupe-entities">

        <div className="entity-card">
          <div
            className="entity-badge"
            style={{ background: "#fff3e0", color: "#e65100" }}
          >
            🔨 Rénovation
          </div>
          <div className="entity-name">MP RENOV</div>
          <div className="entity-desc">
            Spécialiste des travaux de rénovation clé en main. MP Renov maîtrise
            l'ensemble des corps d'état nécessaires aux réhabilitations TCE pour
            l'habitat collectif, les mises aux normes PMR, chambres d'étudiants
            et locaux commerciaux.
          </div>
          <a
            className="entity-link"
            href="https://www.mp-renov.fr"
            target="_blank"
            rel="noreferrer"
          >
            🔗 mp-renov.fr
          </a>
        </div>

        <div className="entity-card">
          <div
            className="entity-badge"
            style={{ background: "#e3f2fd", color: "#1565c0" }}
          >
            🏠 Design & Équipement
          </div>
          <div className="entity-name">HOME DESIGN</div>
          <div className="entity-desc">
            Le spécialiste des cuisines, salles de bain, ameublements,
            revêtements et rénovation intérieure. Des prestations haut de gamme
            de la kitchenette à la cuisine collective, avec un rapport
            qualité-prix imbattable.
          </div>
          <a
            className="entity-link"
            href="https://homedesign-paris.com/"
            target="_blank"
            rel="noreferrer"
          >
            🔗 homedesign-paris.com
          </a>
        </div>

        <div className="entity-card">
          <div
            className="entity-badge"
            style={{ background: "#f3e5f5", color: "#6a1b9a" }}
          >
            📺 Communication digitale
          </div>
          <div className="entity-name">MEDIA4</div>
          <div className="entity-desc">
            Solutions d'affichage dynamique pilotables à distance pour vos halls
            d'accueil, loges, bureaux et salles de réunion. Communication
            moderne, centralisée et flexible pour vos espaces.
          </div>
          <a
            className="entity-link"
            href="http://media4.fr/"
            target="_blank"
            rel="noreferrer"
          >
            🔗 media4.fr
          </a>
        </div>

      </div>

      {/* CHIFFRES */}
      <div className="groupe-hero" style={{ padding: "2rem" }}>
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.3rem",
            marginBottom: "1.5rem",
            color: "var(--green2)",
          }}
        >
          Le groupe en chiffres
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: "1.5rem",
          }}
        >
          <div>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green2)" }}>
              22
            </div>
            <div style={{ fontSize: ".82rem", opacity: 0.6 }}>
              ans d'expérience
            </div>
          </div>

          <div>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green2)" }}>
              3
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

      {/* LIEN SITE */}
      <div
        style={{
          marginTop: "1.2rem",
          padding: "1.1rem",
          background: "#fff",
          borderRadius: "var(--r)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "1.4rem" }}>🌐</span>

        <div>
          <div style={{ fontWeight: 600, fontSize: ".9rem" }}>
            Site web officiel
          </div>
          <div style={{ fontSize: ".81rem", color: "var(--ink3)" }}>
            Retrouvez toutes nos actualités sur
          </div>
        </div>

        <a
          href="https://home-group.fr"
          target="_blank"
          rel="noreferrer"
          className="entity-link"
          style={{ marginLeft: "auto" }}
        >
          home-group.fr →
        </a>
      </div>

    </div>
  );
}