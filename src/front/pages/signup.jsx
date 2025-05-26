import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setMsg("Usuario creado. Ya puedes loguearte.");
      navigate("/login")
    } else {
      setMsg(data.msg || "Error en el registro");
    }
  };

  return (
    <div className="text-center p-3">
      <h2>Registro</h2>
      <form onSubmit={handleSignup} className="p-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Registrarse</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}