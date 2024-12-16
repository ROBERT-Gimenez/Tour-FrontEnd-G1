import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reservas.css'

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("authToken"));
        const response = await axios.get(
          "https://proyectofinald-production.up.railway.app/travel/public/reservas/mis-reservas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservas(response.data);
      } catch (err) {
        setError("Hubo un error al cargar tus reservas. Por favor, intenta nuevamente.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="mis-reservas-container">
      <h2 className="mis-reservas-title">Mis Reservas</h2>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Cargando tus reservas...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : reservas.length === 0 ? (
        <p className="no-reservas-text">No tienes reservas anteriores.</p>
      ) : (
        <ul className="reservas-list">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="reserva-item">
              <h3 className="reserva-title">{reserva.nombreProducto}</h3>
              <p className="reserva-info">
                <strong>ID:</strong> {reserva.id}
              </p>
              <p className="reserva-info">
                <strong>Fecha de Tour:</strong> {reserva.fechaTour}
              </p>
              <p className="reserva-info">
                <strong>Fecha de Reserva:</strong> {reserva.fecha}
              </p>
              <p className="reserva-info">
                <strong>Duración:</strong> {reserva.duracionDias} días
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisReservas;