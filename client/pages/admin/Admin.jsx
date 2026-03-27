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
  const [groupData, setGroupData] = useState({
    heroTitle: "",
    heroText: "",
    startYear: 2004,
    entities: []
  });

  /* ======================
     LOAD GROUP
  ====================== */
  useEffect(() => {
    loadGroup();
  }, []);

  const loadGroup = async () => {
    try {
      const data = await api.get("/group");

      if (data) {
        setGroupData({
          heroTitle: data.heroTitle || "",
          heroText: data.heroText || "",
          startYear: data.startYear || 2004,
          entities: data.entities || []
        });
      }
    } catch (err) {
      console.error("❌ load group:", err);
    }
  };

  /* ======================
     NEWS
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
        photo: imageUrl
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
     SAVE GROUP
  ====================== */
  const saveGroup = async () => {
    try {
      await api.post("/group", groupData);
      alert("Groupe mis à jour ✅");
    } catch (err) {
      console.error(err);
      alert("Erreur sauvegarde");
    }
  };

  /* ======================
     ENTITY HANDLERS
  ====================== */
  const updateEntity = (index, field, value) => {
    const updated = [...groupData.entities];
    updated[index][field] = value;

    setGroupData({
      ...groupData,
      entities: updated
    });
  };

  const addEntity = () => {
    setGroupData({
      ...groupData,
      entities: [
        ...groupData.entities,
        {
          badgeText: "",
          badgeColor: "#eee",
          badgeTextColor: "#000",
          icon: "🏢",
          title: "",
          description: "",
          url: ""
        }
      ]
    });
  };

  const removeEntity = (index) => {
    const updated = groupData.entities.filter((_, i) => i !== index);

    setGroupData({
      ...groupData,
      entities: updated
    });
  };

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
          GROUP GLOBAL
      ====================== */}
      <div className="a-card">
        <h3>🌐 Modifier le groupe</h3>

        <input
          placeholder="Titre hero"
          value={groupData.heroTitle}
          onChange={(e) =>
            setGroupData({ ...groupData, heroTitle: e.target.value })
          }
        />

        <textarea
          placeholder="Texte hero"
          value={groupData.heroText}
          onChange={(e) =>
            setGroupData({ ...groupData, heroText: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Année de création (ex: 2004)"
          value={groupData.startYear}
          onChange={(e) =>
            setGroupData({ ...groupData, startYear: e.target.value })
          }
        />

        <button className="btn btn-green" onClick={saveGroup}>
          Enregistrer
        </button>
      </div>

      {/* ======================
          ENTITIES
      ====================== */}
      <div className="a-card">
        <h3>🏢 Entités</h3>

        {groupData.entities.map((e, i) => (
          <div key={i} style={{ marginBottom: "20px" }}>

            <input
              placeholder="Badge (ex: Rénovation)"
              value={e.badgeText}
              onChange={(ev) => updateEntity(i, "badgeText", ev.target.value)}
            />

            <input
              placeholder="Emoji (ex: 🔨)"
              value={e.icon}
              onChange={(ev) => updateEntity(i, "icon", ev.target.value)}
            />

            <input
              placeholder="Couleur badge"
              value={e.badgeColor}
              onChange={(ev) => updateEntity(i, "badgeColor", ev.target.value)}
            />

            <input
              placeholder="Couleur texte badge"
              value={e.badgeTextColor}
              onChange={(ev) => updateEntity(i, "badgeTextColor", ev.target.value)}
            />

            <input
              placeholder="Titre (ex: MP RENOV)"
              value={e.title}
              onChange={(ev) => updateEntity(i, "title", ev.target.value)}
            />

            <textarea
              placeholder="Description"
              value={e.description}
              onChange={(ev) => updateEntity(i, "description", ev.target.value)}
            />

            <input
              placeholder="URL"
              value={e.url}
              onChange={(ev) => updateEntity(i, "url", ev.target.value)}
            />

            <button onClick={() => removeEntity(i)}>
              ❌ Supprimer
            </button>

            <hr />
          </div>
        ))}

        <button onClick={addEntity}>
          ➕ Ajouter une entité
        </button>
      </div>

    </div>
  );
}
