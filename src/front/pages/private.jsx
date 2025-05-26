import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
  const fetchPrivateData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- ¡AQUÍ está la clave!
        },
      });

      const data = await res.json();
      console.log(data); // o actualizar estado
    } catch (error) {
      console.error("Error al obtener datos privados:", error);
    }
  };

    fetchPrivateData();
  }, [token, navigate]);

  return (
    <div>
      <h2>Página Privada</h2>
      <p>Este es un mensaje privado que solo puedes ver si estas logeado.</p>
    </div>
  );
};

export default Private;