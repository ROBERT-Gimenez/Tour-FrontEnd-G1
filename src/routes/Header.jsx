import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useContextGlobal } from "../components/utils/GlobalContext";

export default function Header() {
  const { state, dispatch } = useContextGlobal();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className="w-full fixed top-0 bg-[#fff0c0] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="link-logo flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
            <span className="ml-2 text-xl font-bold text-gray-800 flex flex-col font-bebas">
              <span className="text-2xl">Trails</span>
              <span>Travel Tours</span>
            </span>
          </Link>
        </div>
        <div className="btns-sessions flex space-x-2">
        {!state?.user?.token ? (
          <>
            <Link to="/crear-cuenta">
            <button className="bg-[#FFFFFF] text-black border border-black px-2 py-1 text-xs md:px-3 md:py-2 rounded-[50px] hover:bg-black hover:text-white hover:border-white transition duration-300 transform hover:scale-105">
              Crear cuenta
            </button>
          </Link>
         
            <Link to="/iniciar-sesion">
              <button className="bg-[#FFFFFF] text-black border border-black px-2 py-1 text-xs md:px-3 md:py-2 rounded-[50px] hover:bg-black hover:text-white hover:border-white transition duration-300 transform hover:scale-105">
                Iniciar sesión
              </button>
            </Link>
          </>
            )
            : (
            <>
            <div className="avatar animate">
              {state.user?.name?.split(' ').map((n) => n[0]).join('')}
            </div>
            {state.user.admin && <Link to="/admin">
              <button  className="bg-[#FFFFFF] text-black border border-black px-2 py-1 text-xs md:px-3 md:py-2 rounded-[50px] hover:bg-black hover:text-white hover:border-white transition duration-300 transform hover:scale-105 animate" >
                Admin
              </button>
            </Link>}
            <Link to="/iniciar-sesion">
              <button onClick={handleLogout} className="bg-[#FFFFFF] text-black border border-black px-2 py-1 text-xs md:px-3 md:py-2 rounded-[50px] hover:bg-black hover:text-white hover:border-white transition duration-300 transform hover:scale-105 animate" >
                Cerrar sesión
              </button>
            </Link>
            </>
          )
          }
        </div>
      </div>
    </header>
  );
}
