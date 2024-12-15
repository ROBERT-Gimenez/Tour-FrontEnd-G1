//mejorar buscador incluir endpoints del back


import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const Buscador = () => {
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const navigate = useNavigate();

  const handleBusquedaChange = (e) => {
    const query = e.target.value;
    setBusqueda(query);

    // Simulación de sugerencias basadas en búsqueda
    if (query.length > 1) {
      setSugerencias(
        ["París", "Londres", "Nueva York", "Roma", "Berlín"].filter((sugerencia) =>
          sugerencia.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setSugerencias([]);
    }
  };

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  const handleSugerenciaClick = (sugerencia) => {
    setBusqueda(sugerencia);
    setSugerencias([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navegar a los resultados de búsqueda
    navigate(`/resultados?query=${busqueda}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  };

  return (
    <div className="mb-6">
      <h2 className="text-4xl font-bold mb-4 text-center py-6">
        Encuentra tu próximo destino
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Usa el buscador para encontrar los tours que mejor se adapten a tus fechas y preferencias.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Campo de búsqueda */}
          <div className="flex-1 relative">
            <label htmlFor="busqueda" className="block text-gray-700 mb-1">
              ¿Qué estás buscando?
            </label>
            <input
              type="text"
              id="busqueda"
              value={busqueda}
              onChange={handleBusquedaChange}
              placeholder="Escribe un destino o actividad..."
              className="p-3 border rounded w-full"
              required
            />
            {sugerencias.length > 0 && (
              <ul className="absolute bg-white border rounded mt-1 max-h-40 overflow-auto w-full z-10">
                {sugerencias.map((sugerencia, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSugerenciaClick(sugerencia)}
                  >
                    {sugerencia}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Rango de fechas */}
          <div className="flex-1">
            <label htmlFor="fechaInicio" className="block text-gray-700 mb-1">
              Fecha inicio
            </label>
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              className="p-3 border rounded w-full"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="fechaFin" className="block text-gray-700 mb-1">
              Fecha fin
            </label>
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={handleFechaFinChange}
              className="p-3 border rounded w-full"
              required
            />
          </div>
        </div>

        {/* Botón de búsqueda */}
        <button
          type="submit"
          className="h-12 bg-[#544013] text-white font-semibold rounded hover:bg-[#e46d20]"
        >
          Realizar búsqueda
        </button>
      </form>
    </div>
  );
};

export default Buscador;
