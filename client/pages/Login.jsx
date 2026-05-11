import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {

    const res = await api.post("/auth/login", {
      email,
      password
    });

    if (res?.token) {

      localStorage.setItem(
        "admin_token",
        res.token
      );

      navigate("/admin");

    } else {
      alert(res?.error || "Erreur login");
    }
  };

  return (
    <div className="page active">
      <div className="a-card" style={{ maxWidth: 450, margin: "40px auto" }}>
        <h2>Connexion admin</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-green" onClick={submit}>
          Connexion
        </button>

        <div style={{ marginTop: 15 }}>
          <Link to="/forgot-password">
            Mot de passe oublié
          </Link>
        </div>
      </div>
    </div>
  );
}
