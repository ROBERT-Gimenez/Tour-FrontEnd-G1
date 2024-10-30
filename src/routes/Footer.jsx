// src/routes/Footer.jsx
import React from "react";
import isologotipo from "../assets/Logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#757575] text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-start md:items-center">
        <div className="svg-wrapper">
          <img
            src={isologotipo}
            alt="Isologotipo"
            className="h-8 mb-2 md:mb-0 md:mr-3 isologo"
          />
        </div>

        <span className="text-center md:text-left text-lg font-bold span-derechos">
          &copy; {currentYear} Travel Trails Tours. Todos los derechos
          reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
