import React, { useState } from "react";
import emailjs from "emailjs-com";

const CrearCuenta = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  const [reenviarCorreo, setReenviarCorreo] = useState(false);

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
    setLoading(true);

    if (validarCampos()) {
      try {
        // Enviar el correo de bienvenida usando EmailJS
        const templateParams = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
        };

        // Enviar correo con EmailJS
        await emailjs.send(
          "service_es6ytu7", // Reemplaza con tu ID de servicio de EmailJS
          "template_5mgr01j", // El ID de tu plantilla
          templateParams, // Los parámetros que reemplazan las variables en la plantilla
          "aA4AqwF37UADVtIXe" // Tu ID de usuario de EmailJS
        );

        setRegistrado(true); // Cambiar el estado cuando el usuario se registre
        setMensaje(
          "¡Te has registrado correctamente! Revisa tu correo para más detalles."
        );
        setReenviarCorreo(true); // Mostrar el botón para reenviar el correo
      } catch (error) {
        console.log("Error al enviar el correo:", error);
        setMensaje(
          "Hubo un problema al enviar el correo. Por favor, intenta más tarde."
        );
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // Manejar cambios en los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Si el usuario empieza a escribir, deshabilitar el estado de "registrado"
    if (registrado) {
      setRegistrado(false);
      setMensaje(""); // Limpiar el mensaje de éxito
      setReenviarCorreo(false); // Ocultar el botón "Reenviar"
    }
  };

  // Función para reenviar el correo
  const handleReenviarCorreo = () => {
    // Aquí puedes agregar la lógica para reenviar el correo
    console.log("Reenviando el correo...");

    // Mostrar el alert
    alert("Hemos enviado nuevamente el correo, visita tu bandeja de entrada.");

    // Ocultar el botón "Reenviar" y restaurar el estado del botón "Registrarse"
    setReenviarCorreo(false);
    setRegistrado(false); // El usuario puede registrarse nuevamente
  };

  // Resetear el estado cuando se haga clic derecho en cualquier parte del formulario
  const handleRightClick = (e) => {
    e.preventDefault(); // Prevenir el menú contextual del navegador
    // Restablecer todos los estados a su valor inicial
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    });
    setErrors({});
    setMensaje("");
    setLoading(false);
    setRegistrado(false);
    setReenviarCorreo(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        onContextMenu={handleRightClick} // Detectar clic derecho
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
          disabled={loading || registrado} // Deshabilitar si está registrando o ya está registrado
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        {/* Mostrar el mensaje de éxito cuando el registro haya sido exitoso */}
        {mensaje && <p className="mt-4 text-center text-gray-700">{mensaje}</p>}

        {/* Mensajes adicionales y el botón "Reenviar" solo si ya se registró */}
        {registrado && reenviarCorreo && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">¿Aún no te llega el correo?</p>
            <button
              className="mt-2 bg-yellow-500 text-white rounded-md py-2 px-4"
              onClick={handleReenviarCorreo}
            >
              Reenviar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CrearCuenta;
