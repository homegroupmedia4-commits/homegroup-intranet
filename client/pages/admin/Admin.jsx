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

  const [faqList, setFaqList] = useState([]);
const [faqCategories, setFaqCategories] = useState([]);

const [faqQuestion, setFaqQuestion] = useState("");
const [faqAnswer, setFaqAnswer] = useState("");
const [faqCategory, setFaqCategory] = useState("Général");

  /* ======================
     GROUP STATE
  ====================== */
  const [groupData, setGroupData] = useState(null);

  const DEFAULT_GROUP = {
  heroTitle: "22 ans d'expérience à votre service",
  heroText:
    "De la construction à l'équipement des habitations HOME GROUP vous propose une offre 360° grâce à ses différentes structures.",
  startYear: 2004,
  entities: [
    {
      badgeText: "Rénovation",
      badgeColor: "#fff3e0",
      badgeTextColor: "#e65100",
      icon: "🔨",
      title: "MP RENOV",
      description:
        "Spécialiste des travaux de rénovation clé en main. MP Renov maîtrise l'ensemble des corps d'état nécessaires aux réhabilitations TCE.",
      url: "https://www.mp-renov.fr"
    },
    {
      badgeText: "Design & Équipement",
      badgeColor: "#e3f2fd",
      badgeTextColor: "#1565c0",
      icon: "🏠",
      title: "HOME DESIGN",
      description:
        "Le spécialiste des cuisines, salles de bain, ameublements et rénovation intérieure.",
      url: "https://homedesign-paris.com/"
    },
    {
      badgeText: "Communication digitale",
      badgeColor: "#f3e5f5",
      badgeTextColor: "#6a1b9a",
      icon: "📺",
      title: "MEDIA4",
      description:
        "Solutions d'affichage dynamique pilotables à distance.",
      url: "http://media4.fr/"
    }
  ]
};

  

useEffect(() => {




api.get("/group").then((data) => {
const mergedEntities = (data.entities || []).map((e, i) => ({
  ...DEFAULT_GROUP.entities[i],
  ...e,
  title: e.title?.trim() ? e.title : DEFAULT_GROUP.entities[i]?.title,
  badgeText: e.badgeText?.trim() ? e.badgeText : DEFAULT_GROUP.entities[i]?.badgeText,
  description: e.description?.trim() ? e.description : DEFAULT_GROUP.entities[i]?.description,
  url: e.url?.trim() ? e.url : DEFAULT_GROUP.entities[i]?.url
}));


  
  setGroupData({
    ...DEFAULT_GROUP,
    ...data,
    heroTitle: data.heroTitle || DEFAULT_GROUP.heroTitle,
    heroText: data.heroText || DEFAULT_GROUP.heroText,
    startYear: data.startYear || DEFAULT_GROUP.startYear,
    entities: mergedEntities.length ? mergedEntities : DEFAULT_GROUP.entities
  });
});


  
  // ✅ QRS
  api.get("/contact/qrs").then(setQrsList);
  // FAQ
api.get("/contact/faq").then(setFaqList);
api.get("/contact/faq/categories").then(setFaqCategories);

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


  const addFaq = async () => {
  if (!faqQuestion || !faqAnswer) {
    return alert("Champs requis");
  }

  const res = await api.post("/contact/faq", {
    question: faqQuestion,
    answer: faqAnswer,
    category: faqCategory
  });

  setFaqList(prev => [...prev, res]);

  setFaqQuestion("");
  setFaqAnswer("");
};

  const deleteFaq = async (id) => {
  if (!window.confirm("Supprimer ?")) return;

  await api.delete(`/contact/faq/${id}`);

  setFaqList(prev => prev.filter(f => f._id !== id));
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
    GROUPE COMPLET
====================== */}
<div className="a-card">
  <h3>🌐 Groupe</h3>

  {/* HERO */}
  <h4>Hero</h4>

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
    placeholder="Année de départ"
    value={groupData.startYear}
    onChange={(e) =>
      setGroupData({
        ...groupData,
        startYear: Number(e.target.value)
      })
    }
  />

  <hr />

  {/* ENTITÉS */}
  <h4>Entités</h4>

  {(groupData.entities || []).map((e, i) => (
    <div key={i} style={{ marginBottom: "25px" }}>

      <strong>{e.title}</strong>

   <input
  placeholder="Badge (ex: 🔨 Rénovation)"
  value={`${e.icon || ""} ${e.badgeText || ""}`.trim()}
  onChange={(ev) => {
    const val = ev.target.value.trim();

    const parts = val.split(" ");
    const icon = parts[0] || "";
    const text = parts.slice(1).join(" ");

    updateEntity(i, "icon", icon);
    updateEntity(i, "badgeText", text);
  }}
/>
      

      <input
        placeholder="Couleur badge"
        value={e.badgeColor}
        onChange={(ev) => updateEntity(i, "badgeColor", ev.target.value)}
      />

      <input
        placeholder="Couleur texte"
        value={e.badgeTextColor}
        onChange={(ev) => updateEntity(i, "badgeTextColor", ev.target.value)}
      />

 
<input
  placeholder="Nom entité"
  value={e.title || ""}
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

      <hr />
    </div>
  ))}

  <button className="btn btn-green" onClick={saveGroup}>
    Enregistrer le groupe
  </button>
</div>


      {/* ======================
    FAQ ADMIN
====================== */}
<div className="a-card">
  <h3>❓ Gérer la Foire aux questions</h3>

  {faqList.length === 0 && <div>Aucune FAQ</div>}

  {faqList.map(f => (
    <div key={f._id} className="faq-admin-item">

      <div style={{ fontWeight: 600 }}>
        {f.question}
      </div>

      <div style={{ margin: "5px 0" }}>
        {f.answer}
      </div>

      <div style={{ fontSize: ".75rem", opacity: 0.6 }}>
        {f.category}
      </div>

      <button onClick={() => deleteFaq(f._id)}>
        ❌ Supprimer
      </button>

      <hr />
    </div>
  ))}

  <input
    placeholder="Question..."
    value={faqQuestion}
    onChange={(e) => setFaqQuestion(e.target.value)}
  />

  <select
    value={faqCategory}
    onChange={(e) => setFaqCategory(e.target.value)}
  >
    {faqCategories.map(cat => (
      <option key={cat}>{cat}</option>
    ))}
  </select>

  <textarea
    placeholder="Réponse..."
    value={faqAnswer}
    onChange={(e) => setFaqAnswer(e.target.value)}
  />

  <button className="btn btn-green" onClick={addFaq}>
    + Ajouter cette entrée
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
