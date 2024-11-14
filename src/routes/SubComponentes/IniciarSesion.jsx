import React, { useState } from "react";
import "./session.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí hacemos la solicitud al backend
      const response = await axios.post(
        "http://localhost:8080/travel/usuarios/login",
        {
          email: email,
          password: password,
        }
      );

      // Simulamos la respuesta
      const userData = response.data;

      // Verificamos si los datos coinciden con el usuario administrador
      if (
        userData.email === "correo@ejemplo.com" &&
        userData.password === "contraseña123"
      ) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/admin"); // Redirige al panel de administración
      } else {
        setError("Acceso denegado. Usuario no autorizado");
      }
    } catch (error) {
      // En caso de error en la respuesta, mostramos un mensaje adecuado
      if (error.response && error.response.status === 401) {
        setError("Correo electrónico o contraseña incorrectos");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="container">
      {user ? (
        <div>
          <div className="avatar">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <p className="welcome-message">Bienvenido, {user.name}!</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="title">Iniciar sesión</h2>
          <input
            className="input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button className="button" type="submit">
            Iniciar sesión
          </button>
        </form>
      )}
    </div>
  );
};

export default IniciarSesion;
