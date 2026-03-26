import { useState } from "react";
import { api } from "../../services/api";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("general");
  const [pinned, setPinned] = useState(false);
  const [file, setFile] = useState(null);

  const handlePublish = async () => {
    if (!title || !body) {
      alert("Titre et contenu requis");
      return;
    }

    let imageUrl = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

    const res = await fetch("https://com.home-group.fr/api/upload", {
  method: "POST",
  body: formData
});

const resUpload = await res.json();

      imageUrl = resUpload.url;
    }

    await api.post("/news", {
      title,
      body,
      category,
      date: new Date().toLocaleDateString("fr-FR"),
      pinned,
      image: imageUrl
    });

    alert("Actualité publiée ✅");

    setTitle("");
    setBody("");
    setPinned(false);
    setFile(null);
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

        <button className="btn btn-green" onClick={handlePublish}>
          Publier
        </button>
      </div>

    </div>
  );
}
