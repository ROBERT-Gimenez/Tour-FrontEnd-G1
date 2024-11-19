import React from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Administradores</h1>
      <div className="flex flex-col w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 text-lg">
          Aquí puedes gestionar los administradores.
        </p>
        {/* Botón para regresar */}
        <button
          className="btn bg-blue-500 text-white mt-6 p-2 rounded-md"
          onClick={() => navigate("/Users")}
        >
          Volver a Administración
        </button>
      </div>
    </div>
  );
}

export default Users;
