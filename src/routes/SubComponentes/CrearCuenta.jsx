//src\routes\SubComponentes\CrearCuenta.jsx
import React, { useState } from "react";

const CrearCuenta = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");

  // Validaciones de los campos
  const validarCampos = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido.trim())
      newErrors.apellido = "El apellido es obligatorio";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Ingresa un correo válido";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (validarCampos()) {
      try {
        // Aquí enviamos los datos al backend (aún por conectar)
        const response = await fetch("URL_DEL_BACKEND/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setMensaje("Registro exitoso, revisa tu correo para confirmación");
          setFormData({ nombre: "", apellido: "", email: "", password: "" });
        } else {
          setMensaje("Hubo un problema con el registro");
        }
      } catch (error) {
        setMensaje("Error de conexión, intenta más tarde");
      }
    }
  };

  // Manejar cambios en los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

        <div className="mb-4">
          <label htmlFor="nombre" className="block font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="apellido" className="block font-medium text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
          {errors.apellido && (
            <p className="text-red-500 text-sm">{errors.apellido}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold hover:bg-blue-600 transition duration-300"
        >
          Registrarse
        </button>

        {mensaje && <p className="mt-4 text-center text-gray-700">{mensaje}</p>}
      </form>
    </div>
  );
};

export default CrearCuenta;
