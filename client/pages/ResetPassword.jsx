import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function ResetPassword() {

  const [password, setPassword] = useState("");

  const [params] = useSearchParams();

  const navigate = useNavigate();

  const token = params.get("token");

  const submit = async () => {

    const res = await api.post("/auth/reset-password", {
      token,
      password
    });

    if (res?.ok) {
      alert("Mot de passe modifié");
      navigate("/login");
    }
  };

  return (
    <div className="page active">
      <div className="a-card" style={{ maxWidth: 450, margin: "40px auto" }}>
        <h2>Nouveau mot de passe</h2>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-green" onClick={submit}>
          Modifier
        </button>
      </div>
    </div>
  );
}
