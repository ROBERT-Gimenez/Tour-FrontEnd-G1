import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authToken"));

    axios.get("https://proyectofinald-production.up.railway.app/travel/public/reservas/mis-reservas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => setReservas(response.data))
    .catch((error) => console.error("Error al cargar las reservas", error));
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Mis Reservas</h2>
      {reservas.length === 0 ? (
        <p className="text-gray-600">No tienes reservas anteriores.</p>
      ) : (
        <ul className="space-y-4">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-xl font-semibold">{reserva.nombreProducto}</h3>
              <p className="text-gray-700">Id: <span className="font-bold">{reserva.id}</span></p>
              <p className="text-gray-700">Fecha de Tour: <span className="font-bold">{reserva.fechaTour}</span></p>
              <p className="text-gray-700">Fecha que hizo la reserva: <span className="font-bold">{reserva.fecha}</span></p>
              <p className="text-gray-700">Duración: <span className="font-bold">{reserva.duracionDias} días</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisReservas;


