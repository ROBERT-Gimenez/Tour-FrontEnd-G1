//src\routes\Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full fixed top-0 bg-[#fff0c0] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Bloque alineado a la izquierda: Logotipo y lema */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="link-logo flex items-center">
            <img src="src\assets\Logo.svg.svg" alt="Logo" className="h-10" />{" "}
            {/* Ajusta la ruta de tu logotipo */}
            <span className="ml-2 text-xl font-bold text-gray-800">
            Trabel Trails Tour
            </span>
          </Link>
        </div>

        {/*menú para dispositivos móviles */}
        <div className="md:hidden flex-grow flex justify-end">
          <Link to="/crear-cuenta">
            <button className="btn-session w-15 h-10 text-xs mr-1 px-2 py-2">
              Crear cuenta
            </button>
          </Link>
          <Link to="/iniciar-sesion">
            <button className="btn-init w-15 h-10 ml-1 text-xs px-2 py-2">
              Iniciar sesión
            </button>
          </Link>
        </div>

        {/* Bloque alineado a la derecha: Botones */}
        <div className="hidden md:flex space-x-4">
          <Link to="/crear-cuenta">
            <button className="btn-session">
              Crear cuenta
            </button>
          </Link>
          <Link to="/iniciar-sesion">
            <button className="btn-init">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
