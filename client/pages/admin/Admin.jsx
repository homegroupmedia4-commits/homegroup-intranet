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
  const [newsList, setNewsList] = useState([]);

  const [newCategory, setNewCategory] = useState("");

  const [faqList, setFaqList] = useState([]);
const [faqCategories, setFaqCategories] = useState([]);

const [faqQuestion, setFaqQuestion] = useState("");
const [faqAnswer, setFaqAnswer] = useState("");
const [faqCategory, setFaqCategory] = useState("Général");
  const [selectedEntity, setSelectedEntity] = useState("all");
  

  /* ======================
     GROUP STATE
  ====================== */
  const [groupData, setGroupData] = useState(null);

const togglePin = async (news) => {
  await api.put(`/news/${news._id}/pin`);

  const updated = await api.get("/news");
  setNewsList(updated);
};

  const DEFAULT_GROUP = {
  heroTitle: "22 ans d'expérience à votre service",
  heroText:
    "De la construction à l'équipement des habitations HOME GROUP vous propose une offre 360° grâce à ses différentes structures.",
  startYear: 2004,


      /* ✅ AJOUT ICI */
  stats: {
  experienceValue: "22",
  experienceLabel: "ans d'expérience",

  entitiesValue: "3",
  entitiesLabel: "entités spécialisées",

  offerValue: "360°",
  offerLabel: "offre complète"
},

  /* ✅ AJOUT ICI */
  website: {
    url: "https://home-group.fr",
    label: "Site web officiel",
    description: "Retrouvez toutes nos actualités sur"
  },

    
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
      title: "HOME xxxxxDESIGN",
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

  stats: {
    ...DEFAULT_GROUP.stats,
    ...data.stats
  },

  website: {
    ...DEFAULT_GROUP.website,
    ...data.website
  },

  heroTitle: data.heroTitle || DEFAULT_GROUP.heroTitle,
  heroText: data.heroText || DEFAULT_GROUP.heroText,
  startYear: data.startYear || DEFAULT_GROUP.startYear,

  entities: mergedEntities.length
    ? mergedEntities
    : DEFAULT_GROUP.entities
});
  
});


  
  // ✅ QRS
  api.get("/contact/qrs").then(setQrsList);
  // FAQ
api.get("/contact/faq").then(setFaqList);
api.get("/contact/faq/categories").then(setFaqCategories);
  api.get("/news").then(setNewsList);

}, []);


  const addCategory = async () => {
  if (!newCategory.trim()) return;

  const res = await api.post("/contact/faq/categories", {
    name: newCategory
  });

  // refresh categories
  const updated = await api.get("/contact/faq/categories");
  setFaqCategories(updated);

  setNewCategory("");
};

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


      const updated = await api.get("/news");
setNewsList(updated);

      

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

       <div className="a-card">
      <h3>Actualités ajoutées</h3>
          

      {newsList.length === 0 && <div>Aucune actualité</div>}

      {newsList.map((n) => (
        <div key={n._id} className="news-admin-item">

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>
              {n.pinned && "📌 "} {n.title}
            </strong>

            <div style={{ display: "flex", gap: "10px" }}>
              <span>{n.category.toUpperCase()}</span>

             <button
  className={`btn-pin ${n.pinned ? "active" : ""}`}
  onClick={() => togglePin(n)}
>
  {n.pinned ? "📌 Épinglée" : "📌 Épingler"}
</button>

              
            </div>
          </div>

     <div style={{ 
  fontSize: ".8rem", 
  opacity: 0.7,
  wordBreak: "break-word",
  overflowWrap: "anywhere"
}}>
  {n.body}
</div>

          {n.photo && (
            <img src={n.photo} style={{ width: 120, marginTop: 8 }} />
          )}

          <hr />
        </div>
      ))}
    </div>

      

      {/* ======================
          NEWS
      ====================== */}
      <div className="a-card">
        <h3>Ajouter une actualité</h3>
         <p>Publiez des actualités avec texte, photo et/ou vidéo.</p>

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

       <div
  className="upload-zone"
  onClick={() => document.getElementById("fileInput").click()}
>
  {file ? (
    <div style={{ position: "relative" }}>
      <img
        src={URL.createObjectURL(file)}
        style={{ width: 120, borderRadius: 8 }}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          setFile(null);
        }}
        style={{
          position: "absolute",
          top: -5,
          right: -5,
          background: "#000",
          color: "#fff",
          borderRadius: "50%",
          width: 22,
          height: 22
        }}
      >
        ✕
      </button>
    </div>
  ) : (
    <div>📷 Cliquer pour ajouter une photo</div>
  )}

  <input
    id="fileInput"
    type="file"
    style={{ display: "none" }}
    onChange={(e) => setFile(e.target.files[0])}
  />
</div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">Général</option>
          <option value="rh">RH</option>
          <option value="direction">Direction </option>
           <option value="organisation">Organisation</option>
           <option value="it">IT</option>
           <option value="evenement">Événement</option>
        </select>

<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "12px"
}}>

  <label style={{ display: "flex", gap: "6px", alignItems: "center" }}>
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


<h4>Statistiques</h4>

{/* EXPERIENCE */}
<input
  placeholder="Valeur expérience (ex: 22)"
  value={groupData.stats?.experienceValue || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      stats: {
        ...groupData.stats,
        experienceValue: e.target.value
      }
    })
  }
/>

<input
  placeholder="Label expérience"
  value={groupData.stats?.experienceLabel || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      stats: {
        ...groupData.stats,
        experienceLabel: e.target.value
      }
    })
  }
/>

{/* ENTITIES */}
<input
  placeholder="Valeur entités (ex: 3)"
  value={groupData.stats?.entitiesValue || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      stats: {
        ...groupData.stats,
        entitiesValue: e.target.value
      }
    })
  }
/>

<input
  placeholder="Label entités"
  value={groupData.stats?.entitiesLabel || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      stats: {
        ...groupData.stats,
        entitiesLabel: e.target.value
      }
    })
  }
/>

{/* OFFER */}
<input
  placeholder="Valeur offre (ex: 360°)"
  value={groupData.stats?.offerValue || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      stats: {
        ...groupData.stats,
        offerValue: e.target.value
      }
    })
  }
/>

<input
  placeholder="Label offre"
  value={groupData.stats?.offerLabel || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      stats: {
        ...groupData.stats,
        offerLabel: e.target.value
      }
    })
  }
/>

<hr />

<h4>Site web</h4>

<input
  placeholder="URL"
  value={groupData.website?.url || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      website: {
        ...groupData.website,
        url: e.target.value
      }
    })
  }
/>

<input
  placeholder="Label (ex: Site web officiel)"
  value={groupData.website?.label || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      website: {
        ...groupData.website,
        label: e.target.value
      }
    })
  }
/>

<input
  placeholder="Description"
  value={groupData.website?.description || ""}
  onChange={(e) =>
    setGroupData({
      ...groupData,
      website: {
        ...groupData.website,
        description: e.target.value
      }
    })
  }
/>

<hr />

  
  

  {/* ENTITÉS */}
  <h4>Entités</h4>

  {/* SELECT */}
  <select
    value={selectedEntity}
    onChange={(e) => setSelectedEntity(e.target.value)}
    style={{ marginBottom: "15px" }}
  >
    <option value="all">Toutes les entités</option>

    {(groupData.entities || []).map((e, i) => (
      <option key={i} value={i}>
        {e.title || `Entité ${i + 1}`}
      </option>
    ))}
  </select>

  {/* LISTE FILTRÉE */}
  {(groupData.entities || [])
    .filter((_, i) => selectedEntity === "all" || i === Number(selectedEntity))
    .map((e) => {
      const realIndex = groupData.entities.findIndex(ent => ent === e);

      return (
        <div key={realIndex} style={{ marginBottom: "25px" }}>

          <strong>{e.title}</strong>

          {/* BADGE (icone + texte) */}
          <input
            placeholder="Badge (ex: 🔨 Rénovation)"
            value={`${e.icon || ""} ${e.badgeText || ""}`.trim()}
            onChange={(ev) => {
              const val = ev.target.value.trim();
              const parts = val.split(" ");

              const icon = parts[0] || "";
              const text = parts.slice(1).join(" ");

              updateEntity(realIndex, "icon", icon);
              updateEntity(realIndex, "badgeText", text);
            }}
          />

          {/* NOM */}
          <input
            placeholder="Nom entité"
            value={e.title || ""}
            onChange={(ev) => updateEntity(realIndex, "title", ev.target.value)}
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={e.description}
            onChange={(ev) => updateEntity(realIndex, "description", ev.target.value)}
          />

          {/* URL */}
          <input
            placeholder="URL"
            value={e.url}
            onChange={(ev) => updateEntity(realIndex, "url", ev.target.value)}
          />

          <hr />
        </div>
      );
    })}

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
      <div style={{ fontWeight: 600 }}>{f.question}</div>
      <div style={{ margin: "5px 0" }}>{f.answer}</div>
      <div style={{ fontSize: ".75rem", opacity: 0.6 }}>
        {f.category}
      </div>

      <button onClick={() => deleteFaq(f._id)}>
        ❌ Supprimer
      </button>

      <hr />
    </div>
  ))}

  {/* QUESTION */}
  <input
    placeholder="Question..."
    value={faqQuestion}
    onChange={(e) => setFaqQuestion(e.target.value)}
  />

  {/* 🔥 CREATE CATEGORY */}
  <h4>Catégories</h4>

  <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
    <input
      placeholder="Nouvelle catégorie..."
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
    />

    <button className="btn btn-green" onClick={addCategory}>
      + Ajouter
    </button>
  </div>

  {/* LIST */}
  {faqCategories.map(cat => (
    <div key={cat} style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px"
    }}>
      <span>{cat}</span>
    </div>
  ))}

  {/* SELECT */}
  <select
    value={faqCategory}
    onChange={(e) => setFaqCategory(e.target.value)}
  >
    {faqCategories.map(cat => (
      <option key={cat}>{cat}</option>
    ))}
  </select>

  {/* ANSWER */}
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
