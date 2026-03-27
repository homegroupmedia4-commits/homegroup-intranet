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
  const [qrsList, setQrsList] = useState([]);

  /* ======================
     GROUP STATE
  ====================== */
  const [groupData, setGroupData] = useState(null);

useEffect(() => {

  // GROUP
  api.get("/group").then((data) => {
    if (!data.entities || data.entities.length === 0) {
      data.entities = [
        {
          badgeText: "Rénovation",
          icon: "🔨",
          title: "MP RENOV",
          description: "Spécialiste des travaux de rénovation clé en main...",
          url: "https://www.mp-renov.fr"
        },
        {
          badgeText: "Design & Équipement",
          icon: "🏠",
          title: "HOME DESIGN",
          description: "Le spécialiste des cuisines, salles de bain...",
          url: "https://homedesign-paris.com/"
        },
        {
          badgeText: "Communication digitale",
          icon: "📺",
          title: "MEDIA4",
          description: "Solutions d'affichage dynamique pilotables...",
          url: "http://media4.fr/"
        }
      ];
    }

    setGroupData(data);
  });

  // ✅ QRS
  api.get("/contact/qrs").then(setQrsList);

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
   await api.put("/group", groupData);
   alert("Groupe mis à jour ✅");
};



  const updateStatus = async (id, status) => {
  await api.put(`/contact/qrs/${id}/status`, { status });

  setQrsList(prev =>
    prev.map(q => q._id === id ? { ...q, status } : q)
  );
};


  const togglePublic = async (id) => {
  const res = await api.put(`/contact/qrs/${id}/visibility`);

  setQrsList(prev =>
    prev.map(q => q._id === id ? res : q)
  );
};


  const deleteQrs = async (id) => {
  if (!window.confirm("Supprimer ?")) return;

  await api.delete(`/contact/qrs/${id}`);

  setQrsList(prev => prev.filter(q => q._id !== id));
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


      {/* ======================
    QRS ADMIN
====================== */}
<div className="a-card">
  <h3>💬 Modération QRS</h3>

  {qrsList.length === 0 && <div>Aucune contribution</div>}

  {qrsList.map(q => (
    <div key={q._id} className="qrs-admin-card">

      <div style={{ fontSize: ".75rem", opacity: 0.6 }}>
        {q.isAnon ? "Anonyme" : `${q.prenom} ${q.nom}`}
      </div>

      <div style={{ fontWeight: 600 }}>{q.category}</div>

      <div style={{ margin: "6px 0" }}>
        {q.message}
      </div>

      <div style={{ fontSize: ".7rem", marginBottom: "8px" }}>
        Status: <b>{q.status}</b> | Public: <b>{q.public ? "Oui" : "Non"}</b>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>

        <button onClick={() => updateStatus(q._id, "approved")}>
          ✅ Approuver
        </button>

        <button onClick={() => updateStatus(q._id, "rejected")}>
          ❌ Refuser
        </button>

        <button onClick={() => togglePublic(q._id)}>
          🌍 Toggle public
        </button>

        <button onClick={() => deleteQrs(q._id)}>
          🗑 Supprimer
        </button>

      </div>

      <hr />
    </div>
  ))}
</div>

    </div>
  );
}
