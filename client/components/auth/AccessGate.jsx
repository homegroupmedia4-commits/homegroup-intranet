import { useState } from "react";
import { api } from "../../services/api";

export default function AccessGate({ children }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [granted, setGranted] = useState(
    () => localStorage.getItem("access_granted") === "true"
  );

  const submit = async () => {
    const res = await api.post("/auth/check-access-code", { code });

    if (res?.success === true) {
      localStorage.setItem("access_granted", "true");
      setError(false);
      setGranted(true);
    } else {
      setError(true);
    }
  };

  if (granted) return children;

  return (
    <div className="page active">
      <div className="a-card" style={{ maxWidth: 400, margin: "80px auto" }}>
        <h2>Accès protégé</h2>

        <input
          type="password"
          placeholder="Code d'accès"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        {error && (
          <div style={{ color: "var(--red)", fontSize: ".85rem", marginBottom: "10px" }}>
            Code incorrect
          </div>
        )}

        <button className="btn btn-green" onClick={submit}>
          Accéder
        </button>
      </div>
    </div>
  );
}
