import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import IniciarSesion from "./components/login-Register/IniciarSesion";
import useAuthLogin from "../hooks/useAuthLogin";
import Swal from "sweetalert2";

export default function Header() {
  const { checkToken, user, loading , rol } = useAuthLogin();
  const [dataUser, setDataUser] = useState(user);

  useEffect(() => {
    let data = checkToken()
    setDataUser(data)
    console.log(rol)
  }, [loading]);

  useEffect(() => {
    Swal.fire({
      title: "Cargando...",
      html: "Validando sesión, por favor espera.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    checkToken();
  }, []);

  useEffect(() => {
    if (!loading) {
      Swal.close();
    }
  }, [loading]);

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
          {(rol?.name !== "ADMIN" ) ? (
            <>
              <IniciarSesion />
            </>
          ) : (
            <>
              <IniciarSesion />
              {rol?.id == 1 && (
                <Link to="/admin">
                  <button className="bg-[#FFFFFF] text-black border border-black px-2 py-1 text-xs md:px-3 md:py-2 rounded-[50px] hover:bg-black hover:text-white hover:border-white transition duration-300 transform hover:scale-105 animate">
                    Admin
                  </button>
                </Link>
              )}
            </>
          )}

          {!dataUser ? (
            <Link to="/crear-cuenta">
              <button className="bg-[#FFFFFF] text-black border border-black px-2 py-1 text-xs md:px-3 md:py-2 rounded-[50px] hover:bg-black hover:text-white hover:border-white transition duration-300 transform hover:scale-105 w-[6rem]">
                Crear cuenta
              </button>
            </Link>
          ) : (
            <>
            <Link to="/favoritos">
              <button className="bg-[#FFFFFF] text-black border border-black px-2 py-1 text-xs md:px-3 md:py-2 rounded-[50px] hover:bg-black hover:text-white hover:border-white transition duration-300 transform hover:scale-105 w-[6rem]">
                Favoritos
              </button>
            </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}