import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token en Private:", token);  // <-- VERIFICA EL TOKEN AQUÍ

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPrivateData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          localStorage.removeItem("token");
          setMessage("Acceso denegado. Necesitas iniciar sesión.");
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        setMessage("Error de conexión");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchPrivateData();
  }, [token, navigate]);

  return (
    <div>
      <h2>Página Privada</h2>
      <p>{message}</p>
    </div>
  );
};

export default Private;