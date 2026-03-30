import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const data = await api.get("/news");

    // ✅ tri: pinned en premier + récent
    const sorted = data.sort((a, b) => {
      if (b.pinned !== a.pinned) return b.pinned - a.pinned;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setNews(sorted);
  };

  const handleDelete = async (id) => {
    await api.delete(`/news/${id}`);
    fetchNews();
  };

  // ✅ LABELS
  const getLabel = (cat) => {
    return {
      rh: "RH",
      direction: "Direction",
      organisation: "Organisation",
      it: "IT",
      evenement: "Événement",
      general: "Général"
    }[cat] || cat;
  };

  // ✅ STYLE BADGE
  const getBadgeStyle = (cat) => {
    return {
      rh: { background: "#fce4ec", color: "#c62828" },
      organisation: { background: "#e3f2fd", color: "#1565c0" },
      it: { background: "#e8f5e9", color: "#2e7d32" },
      direction: { background: "#fff8e1", color: "#c9a84c" },
      evenement: { background: "#f3e5f5", color: "#6a1b9a" },
      general: { background: "#e0f7fa", color: "#006064" }
    }[cat] || {};
  };

  return (
    <div className="page active">
      <div className="ph">
        <div className="ph-tag">La vie du groupe</div>
        <h1>Actualités</h1>
        <p>Les dernières nouvelles du groupe Home Group.</p>
      </div>

      <div className="news-grid">
        {news.length === 0 && (
          <div className="news-empty">
            <p>Aucune actualité</p>
          </div>
        )}

        {news.map((n) => (
          <div key={n._id} className="news-card">

            {/* HEADER */}
            <div className="nc-top">
              <span
                className="badge"
                style={getBadgeStyle(n.category)}
              >
                {getLabel(n.category)}
              </span>

              <span className="nc-date">{n.date}</span>
            </div>

            {/* BODY */}
            <div className="nc-body">
              <h3>{n.title}</h3>
              <p>{n.body}</p>
              {n.image && (
  <img src={n.image} className="nc-media" />
)}

              {/* IMAGE */}
              {n.photo && (
                <img src={n.photo} className="nc-media" />
              )}

              {/* VIDEO */}
              {n.video && (
                <video src={n.video} controls className="nc-video" />
              )}

              {/* PIN */}
              {n.pinned && (
                <div className="nc-pin">
                  📌 Épinglée
                </div>
              )}

          
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
