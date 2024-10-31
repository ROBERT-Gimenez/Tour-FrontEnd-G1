// src/routes/Home.jsx

import React from "react";
import Buscador from "./SubComponentes/Buscador";
import Categorias from "./SubComponentes/Categorias";
import ListaDeRecomendaciones from "./SubComponentes/ListaDeRecomendaciones";
import Separador from "./SubComponentes/Separador";

const Home = () => {
  return (
    <div className=" bg-[#FFFFFF]  w-full min-h-screen flex flex-col px-4 md:px-10 lg:px-20">
      {" "}
      <div className="flex-grow p-4">
        <Buscador />
        <div className="mb-8">
          <Categorias />
        </div>
        <div>
          <Separador />
        </div>
        <div className="mb-8">
          <ListaDeRecomendaciones />
        </div>
      </div>
    </div>
  );
};

export default Home;
