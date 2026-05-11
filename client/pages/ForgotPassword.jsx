import { useState } from "react";
import { api } from "../services/api";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const submit = async () => {

    await api.post("/auth/forgot-password", {
      email
    });

    alert("Email envoyé");
  };

  return (
    <div className="page active">
      <div className="a-card" style={{ maxWidth: 450, margin: "40px auto" }}>
        <h2>Mot de passe oublié</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-green" onClick={submit}>
          Envoyer
        </button>
      </div>
    </div>
  );
}
