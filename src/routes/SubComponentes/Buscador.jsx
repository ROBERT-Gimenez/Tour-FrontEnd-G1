//src\routes\SubComponentes\Buscador.jsx
import React, { useState } from "react";

const Buscador = () => {
  const [ubicacion, setUbicacion] = useState("");
  const [fecha, setFecha] = useState("");

  const handleUbicacionChange = (e) => {
    setUbicacion(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mb-4">
      <h2 className="text-4xl font-bold mb-6 text-center py-10">
        Buscador de Tours Turísticos
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Contenedor para los inputs y el botón */}

        <div className="flex items-end space-x-4">
          {/* Input para la ubicación */}
          <div className="flex-1">
            <label htmlFor="ubicacion" className="block text-gray-700 mb-1">
              Ubicación
            </label>
            <select
              id="ubicacion"
              value={ubicacion}
              onChange={handleUbicacionChange}
              className="p-2 border rounded w-full"
              required
            >
              <option value="">Selecciona una ubicación</option>
              <option value="paris">París</option>
              <option value="londres">Londres</option>
              <option value="nueva-york">Nueva York</option>
            </select>
          </div>

          {/* Input para la fecha */}
          <div className="flex-1">
            <label htmlFor="fecha" className="block text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={handleFechaChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          {/* Botón para enviar la búsqueda */}
          <button
            type="submit"
            className="h-10 px-4 py-2 bg-[#544013] text-white font-semibold rounded hover:bg-[#e46d20]"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Buscador;
