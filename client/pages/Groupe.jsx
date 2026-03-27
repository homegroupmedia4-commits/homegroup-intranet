import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Groupe() {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    api.get("/group").then(setGroup);
  }, []);

  if (!group) return <div>Chargement...</div>;

  return (
    <div className="page active">

      <div className="ph">
        <div className="ph-tag">À propos</div>
        <h1>Notre Groupe</h1>
        <p>{group.heroText}</p>
      </div>

      <div className="groupe-hero">
        <img src="/logo.png" />
        <h2>{group.heroTitle}</h2>
        <p>{group.heroText}</p>
      </div>

      <div className="groupe-entities">
        {group.entities.map((e, i) => (
          <div key={i} className="entity-card">
            <div
              className="entity-badge"
              style={{ background: e.badge, color: e.color }}
            >
              {e.name}
            </div>
            <div className="entity-name">{e.name}</div>
            <div className="entity-desc">{e.description}</div>
            <a href={e.url} target="_blank" className="entity-link">
              🔗 {e.url}
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
