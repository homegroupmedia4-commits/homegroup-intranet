import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function News() {
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

  return (
    <div className="page active">

      <div className="ph">
        <div className="ph-tag">La vie du groupe</div>
        <h1>Actualités</h1>
        <p>Les dernières nouvelles du groupe</p>
      </div>

      <div className="news-grid">

        {news.length === 0 && (
          <div className="news-empty">
            <p>Aucune actualité</p>
          </div>
        )}

        {news.map((n) => (
          <div key={n._id} className="news-card">

            <div className="nc-top">
              <span className="badge">{n.category}</span>
              <span>{n.date}</span>
            </div>

            <div className="nc-body">
              <h3>{n.title}</h3>
              <p>{n.body}</p>

              {n.pinned && (
                <div style={{ color: "green", fontWeight: "bold" }}>
                  📌 Épinglée
                </div>
              )}

              {/* DELETE (temp dev) */}
              <button
                onClick={() => handleDelete(n._id)}
                style={{ marginTop: "10px" }}
              >
                ❌ Supprimer
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
