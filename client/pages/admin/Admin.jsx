import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function Admin() {

  /* ======================
     NEWS STATE
  ====================== */
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("general");
  const [pinned, setPinned] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ======================
     GROUP STATE
  ====================== */
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    api.get("/group").then(setGroupData);
  }, []);

  /* ======================
     NEWS PUBLISH
  ====================== */
  const handlePublish = async () => {
    if (!title || !body) {
      alert("Titre et contenu requis");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = "";

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("https://com.home-group.fr/api/upload", {
          method: "POST",
          body: formData
        });

        const resUpload = await res.json();

        if (!res.ok || !resUpload.url) {
          throw new Error("Erreur upload image");
        }

        imageUrl = resUpload.url;
      }

      await api.post("/news", {
        title,
        body,
        category,
        date: new Date().toLocaleDateString("fr-FR"),
        pinned,
        photo: imageUrl // ✅ cohérent avec backend
      });

      alert("Actualité publiée ✅");

      setTitle("");
      setBody("");
      setPinned(false);
      setFile(null);

    } catch (err) {
      console.error("❌ ERROR:", err);
      alert("Erreur lors de la publication");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     GROUP UPDATE
  ====================== */
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

  if (!groupData) return <div>Chargement...</div>;

  /* ======================
     UI
  ====================== */
  return (
    <div className="page active">

      <div className="ph">
        <h1>Admin</h1>
      </div>

      {/* ======================
          NEWS
      ====================== */}
      <div className="a-card">
        <h3>📢 Ajouter une actualité</h3>

        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Contenu"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">Général</option>
          <option value="rh">RH</option>
          <option value="organisation">Organisation</option>
        </select>

        <label style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={pinned}
            onChange={() => setPinned(!pinned)}
          />
          Épingler
        </label>

        <button
          className="btn btn-green"
          onClick={handlePublish}
          disabled={loading}
        >
          {loading ? "Publication..." : "Publier"}
        </button>
      </div>

      {/* ======================
          GROUP HERO
      ====================== */}
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
            setGroupData({
              ...groupData,
              startYear: Number(e.target.value) // ✅ FIX IMPORTANT
            })
          }
        />

        <button className="btn btn-green" onClick={saveGroup}>
          Enregistrer
        </button>
      </div>

      {/* ======================
          ENTITÉS FIXES
      ====================== */}
      <div className="a-card">
        <h3>🏢 Entités (fixes)</h3>

        {(groupData.entities || []).map((e, i) => (
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
