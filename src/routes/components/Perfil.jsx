import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContextGlobal } from "../../utils/GlobalContext";
import { showErrorAlert, spinner } from "../../api/alert";

const Perfil = () => {
  const [reservas, setReservas] = useState([]);
  const { state } = useContextGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (!token) {
      navigate("/login");
      return;
    }
    spinner(true)

    axios
      .get("https://proyectofinald-production.up.railway.app/travel/public/reservas/mis-reservas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {        
        setReservas(response.data)
        spinner(false)
      })
      .catch((error) => {
        console.error("Error al cargar las reservas", error)
        showErrorAlert("Error al cargar las reservas")
      });
  }, [navigate]);

  const redirect = (productId) => {
    /* navigate(`/producto/${productId}`) */
  }

  return (
    <div className="perfil-container">
      <h2 className="text-2xl font-semibold mb-4">Mi Perfil</h2>
      <p className="text-lg">Bienvenido, {state.user?.nombre}</p>
      
      <h3 className="mt-6 mb-4 text-xl">Mis Reservas</h3>
      {reservas.length === 0 ? (
        <p>No tienes reservas anteriores.</p>
      ) : (
        <ul className="reservas-list">
          {reservas.map((reserva) => (
            <li onClick={() => {redirect(reserva.id)}} key={reserva.id} className="reserva-item">
              <h4>{reserva.nombreProducto}</h4>
              <p>Fecha de Tour: {reserva.fechaTour}</p>
              <p>Fecha de Reserva: {reserva.fecha}</p>
              <p>Duración: {reserva.duracionDias} días</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Perfil;
