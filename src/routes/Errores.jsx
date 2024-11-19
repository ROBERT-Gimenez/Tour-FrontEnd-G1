import React from "react";

const Errores = ({ tipoError }) => {
  let mensaje;
  let estilo =
    "flex items-center justify-center min-h-screen bg-gray-50 text-center text-xl font-semibold";

  if (tipoError === "401") {
    mensaje =
      "Error 401 - Usuario no autorizado. No puedes acceder a esta sección.";
    estilo += " text-red-600";
  } else if (tipoError === "404") {
    mensaje = "Error 404 - Página no encontrada.";
    estilo += " text-blue-600";
  } else {
    mensaje = "Error desconocido.";
    estilo += " text-yellow-600";
  }

  return (
    <div className={estilo}>
      <div>
        <h2>{mensaje}</h2>
      </div>
    </div>
  );
};

export default Errores;
