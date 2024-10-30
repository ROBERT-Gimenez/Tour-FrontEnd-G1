import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";

export default function Header() {
  return (
    <header className="w-full fixed top-0 bg-[#fff0c0] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="link-logo flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              Travel Trails Tours
            </span>
          </Link>
        </div>

        {/* Botones en todas las pantallas */}
        <div className="flex space-x-2">
          <Link to="/crear-cuenta">
            <button className="btn-session px-3 py-2 text-sm md:px-4 md:py-2">
              Crear cuenta
            </button>
          </Link>
          <Link to="/iniciar-sesion">
            <button className="btn-init px-3 py-2 text-sm md:px-4 md:py-2">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
