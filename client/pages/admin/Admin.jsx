import { useState } from "react";
import { api } from "../../services/api";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("general");
  const [pinned, setPinned] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title || !body) {
      alert("Titre et contenu requis");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = "";

      /* ======================
         📤 UPLOAD IMAGE
      ====================== */
      if (file) {
        console.log("📤 Uploading file:", file);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("https://com.home-group.fr/api/upload", {
          method: "POST",
          body: formData
        });

        const resUpload = await res.json();

        console.log("✅ Upload response:", resUpload);

        if (!res.ok || !resUpload.url) {
          throw new Error("Erreur upload image");
        }

        imageUrl = resUpload.url;
      }

      /* ======================
         📰 CREATE NEWS
      ====================== */
      await api.post("/news", {
        title,
        body,
        category,
        date: new Date().toLocaleDateString("fr-FR"),
        pinned,
        image: imageUrl
      });

      alert("Actualité publiée ✅");

      /* ======================
         RESET
      ====================== */
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

  return (
    <div className="page active">

      <div className="ph">
        <h1>Admin</h1>
      </div>

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
          onChange={(e) => {
            const selected = e.target.files[0];
            console.log("📁 Selected file:", selected);
            setFile(selected);
          }}
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

    </div>
  );
}
