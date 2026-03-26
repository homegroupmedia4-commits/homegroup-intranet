import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("general");
  const [pinned, setPinned] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const data = await api.get("/news");
    setNews(data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/news/${id}`);
    fetchNews();
  };

  const handlePublish = async () => {
    if (!title || !body) {
      alert("Titre et contenu requis");
      return;
    }

    await api.post("/news", {
      title,
      body,
      category,
      date: new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
      pinned
    });

    setTitle("");
    setBody("");
    setPinned(false);

    fetchNews();
  };

  // LABEL
  const getLabel = (cat) => ({
    rh: "RH",
    direction: "Direction",
    organisation: "Organisation",
    it: "IT",
    evenement: "Événement",
    general: "Général"
  }[cat] || cat);

  return (
    <div className="page active">

      <div className="ph">
        <h1>Admin</h1>
      </div>

      <div className="a-card">
        <h3>📢 Gérer les actualités</h3>
        <p className="sub">
          Publiez des actualités avec texte, photo et/ou vidéo.
        </p>

        {/* LISTE */}
        <div style={{ marginBottom: "15px" }}>
          {news.map((n) => (
            <div
              key={n._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#f8fafc",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "8px 10px",
                marginBottom: "6px"
              }}
            >
              <div>
                <strong>
                  {n.pinned && "📌 "}
                  {n.title}
                </strong>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  {n.body.substring(0, 40)}...
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="badge">
                  {getLabel(n.category)}
                </span>

                <button
                  onClick={() => handleDelete(n._id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "red",
                    cursor: "pointer"
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <input
          type="text"
          placeholder="Titre de l'actualité..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">Général</option>
            <option value="rh">RH</option>
            <option value="direction">Direction</option>
            <option value="organisation">Organisation</option>
            <option value="it">IT</option>
            <option value="evenement">Événement</option>
          </select>

          <input
            type="text"
            placeholder="Date ex: 19 mars 2026"
          />
        </div>

        <textarea
          placeholder="Contenu de l'actualité..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {/* PIN + BTN */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ fontSize: "14px" }}>
            <input
              type="checkbox"
              checked={pinned}
              onChange={() => setPinned(!pinned)}
            />{" "}
            Épingler
          </label>

          <button className="btn btn-green" onClick={handlePublish}>
            + Publier
          </button>
        </div>

      </div>
    </div>
  );
}
