import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const CrearCuenta = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para enviar el correo de bienvenida
  const sendWelcomeEmail = () => {
    const emailData = {
      user_name: `${nombre} ${apellido}`,
      user_email: username,
      message:
        "Te agradecemos por unirte a esta bella comunidad viajera. Te enviaremos siempre las mejores ofertas personalizadas y nuevos paquetes para ti y tus seres queridos.",
    };

    emailjs
      .send(
        "service_es6ytu7", // Reemplaza con tu Service ID
        "template_l9du7n2", // Reemplaza con tu Template ID
        emailData,
        "aA4AqwF37UADVtIXe" // Reemplaza con tu Public Key
      )
      .then(
        () => {
          console.log("Correo de bienvenida enviado con éxito");
        },
        (error) => {
          console.error("Error al enviar el correo de bienvenida:", error.text);
        }
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password || !nombre || !apellido) {
      setError("Todos los campos son obligatorios");
      return;
    }
  
    const userData = { username, password, nombre, apellido };
  
    try {
      setIsLoading(true);
      setError(null);
  
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Usuario registrado exitosamente:", data);
  
        // Enviar correo de bienvenida
        sendWelcomeEmail();
  
        // Limpiar los campos del formulario si es necesario
        setUsername("");
        setPassword("");
        setNombre("");
        setApellido("");
      } else {
        const errorData = await response.json(); // Captura el mensaje de error del backend
        setError(errorData.errorMessage || "Error al registrar usuario"); // Muestra el mensaje del backend si está disponible
      }
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Crear Cuenta</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-gray-700"
          >
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Crear Cuenta"}
        </button>
      </form>
    </div>
  );
};

export default CrearCuenta;
