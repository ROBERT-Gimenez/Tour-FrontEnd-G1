//src\routes\Footer.jsx
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#6da590] text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-start md:items-center">
        {/* Isologotipo de la empresa */}
        <img
          src="/logo.png"
          alt="Isologotipo"
          className="h-8 mb-2 md:mb-0 md:mr-3"
        />
        {/* Información de copyright */}
        <span className="text-center md:text-left text-lg font-bold">
          &copy; {currentYear} Mi Empresa. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
