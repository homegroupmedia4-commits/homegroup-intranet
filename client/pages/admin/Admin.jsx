import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function Admin() {

  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    api.get("/group").then(setGroupData);
  }, []);

  if (!groupData) return <div>Chargement...</div>;

  const updateEntity = (index, field, value) => {
    const updated = [...groupData.entities];
    updated[index][field] = value;

    setGroupData({
      ...groupData,
      entities: updated
    });
  };

  const saveGroup = async () => {
    await api.post("/group", groupData);
    alert("Groupe mis à jour ✅");
  };

  return (
    <div className="page active">

      <div className="ph">
        <h1>Admin</h1>
      </div>

      {/* HERO */}
      <div className="a-card">
        <h3>🌐 Hero</h3>

        <input
          value={groupData.heroTitle}
          onChange={(e) =>
            setGroupData({ ...groupData, heroTitle: e.target.value })
          }
        />

        <textarea
          value={groupData.heroText}
          onChange={(e) =>
            setGroupData({ ...groupData, heroText: e.target.value })
          }
        />

        <input
          type="number"
          value={groupData.startYear}
          onChange={(e) =>
            setGroupData({ ...groupData, startYear: e.target.value })
          }
        />

        <button className="btn btn-green" onClick={saveGroup}>
          Enregistrer
        </button>
      </div>

      {/* ENTITÉS FIXES */}
      <div className="a-card">
        <h3>🏢 Entités (fixes)</h3>

        {groupData.entities.map((e, i) => (
          <div key={i} style={{ marginBottom: "25px" }}>

            <strong>{e.title}</strong>

            <input
              value={e.badgeText}
              onChange={(ev) => updateEntity(i, "badgeText", ev.target.value)}
            />

            <input
              value={e.icon}
              onChange={(ev) => updateEntity(i, "icon", ev.target.value)}
            />

            <textarea
              value={e.description}
              onChange={(ev) => updateEntity(i, "description", ev.target.value)}
            />

            <input
              value={e.url}
              onChange={(ev) => updateEntity(i, "url", ev.target.value)}
            />

            <hr />
          </div>
        ))}

        <button className="btn btn-green" onClick={saveGroup}>
          Enregistrer
        </button>
      </div>

    </div>
  );
}
