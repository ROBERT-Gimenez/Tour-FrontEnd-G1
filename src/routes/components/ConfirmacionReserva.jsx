import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContextGlobal } from "../../utils/GlobalContext";

const ConfirmacionReserva = () => {
  const [reserva, setReserva] = useState(null);
  const [producto, setProducto] = useState(null);
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContextGlobal();
  const reservaId = searchParams.get("reservaId");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      return;
    }

    const fetchReserva = async () => {
      try {
        // Obtener datos de la reserva
        const reservaResponse = await axios.get(
          `https://proyectofinald-production.up.railway.app/travel/public/reservas/${reservaId}`,
          {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` },
          }
        );

        setReserva(reservaResponse.data);

        // Obtener datos del producto relacionado
        const productoResponse = await axios.get(
          `https://proyectofinald-production.up.railway.app/travel/public/productos/${reservaResponse.data.productoId}`,
          {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` },
          }
        );

        setProducto(productoResponse.data);
      } catch (error) {
        console.error("Error al cargar los datos de la reserva o producto:", error);
        alert("No se pudo recuperar la información de la reserva.");
        navigate("/perfil");
      }
    };

    fetchReserva();
  }, [navigate, reservaId, dispatch]);

  if (!reserva || !producto) return <p>Cargando información de la reserva...</p>;

  return (
    <div className="confirmation-container p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Reserva Confirmada</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Información del Producto */}
        <div className="product-info bg-gray-100 p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Información del Producto</h2>
          <p><span className="font-semibold">Nombre:</span> {producto.nombre}</p>
          <p><span className="font-semibold">Ubicación:</span> {producto.ubicacion}</p>
          <p><span className="font-semibold">Categoría:</span> {producto.categoria?.name || "Sin categoría"}</p>
          <p><span className="font-semibold">Costo:</span> ${producto.precio}</p>
          <p><span className="font-semibold">Fecha del Tour:</span> {reserva.fechaTour}</p>
          <p><span className="font-semibold">Duración:</span> {reserva.duracionDias} días</p>
        </div>

        {/* Información del Usuario */}
        <div className="user-info bg-gray-100 p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Información del Usuario</h2>
          <p><span className="font-semibold">Nombre:</span> {state.user?.nombre} {state.user?.apellido}</p>
          <p><span className="font-semibold">Correo Electrónico:</span> {state.user?.email}</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/perfil")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Ir a mi Perfil
        </button>
      </div>
    </div>
  );
};

export default ConfirmacionReserva;