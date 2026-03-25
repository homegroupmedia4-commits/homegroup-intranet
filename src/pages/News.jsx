export default function News() {
  return (
    <div className="page active">
      
      {/* HEADER */}
      <div className="ph">
        <div className="ph-tag">La vie du groupe</div>
        <h1>Actualités</h1>
        <p>
          Les dernières nouvelles et annonces du groupe Home Group.
        </p>
      </div>

      {/* GRID */}
      <div className="news-grid">
        
        {/* EMPTY STATE */}
        <div className="news-empty">
          <div style={{ fontSize: "2.5rem", marginBottom: ".8rem" }}>
            📭
          </div>
          <p>
            Aucune actualité publiée.
            <br />
            L'administrateur peut en ajouter via le panneau Admin.
          </p>
        </div>

      </div>
    </div>
  );
}