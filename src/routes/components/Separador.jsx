import React from "react";
import Vector from "../../assets/Vector.png";
import ttt from "../../assets/ttt.png";

function Separador() {
  return (
    <section className="bg-[#C59DDC] w-full flex justify-center py-12 flex items-center">
      <div className="relative -mt-40 hidden md:block">
        <img src={Vector} alt="Vector" className="w-40 h-40" />
      </div>
      <div className="pl-5 text-center">
        <h2 className="text-black font-bold text-4xl ">¿Qué nos distingue?</h2>
        <p className="text-black text-sm pt-2 w-72	">
          La transparencia en nuestros procesos es indispensable para nuestros
          clientes. La forma en cómo mostramos nuestros costos, trato y
          comunicación abierta es nuestra mayor fortaleza.
        </p>
      </div>
      <div className="relative -mb-10 hidden md:block">
        <img src={ttt} alt="logo ttt" />
      </div>
    </section>
  );
}

export default Separador;
