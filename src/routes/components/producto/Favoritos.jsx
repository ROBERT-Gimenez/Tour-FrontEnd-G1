import React from "react";
import { useNavigate } from "react-router-dom";
import { useContextGlobal } from "../../../utils/GlobalContext";

const Favoritos = () => {
  const { state, dispatch } = useContextGlobal();
  const navigate = useNavigate();

  return (
    <div className="content-fav">
      <h1 className="text-3xl font-bold text-center mb-6">Productos Favoritos</h1>
      <div className="container mx-auto p-10">
        {state.favs.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No tienes productos favoritos aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.favs.map((producto) => {
              const { id, img, nombre, categoria, ubicacion } = producto;

              if (!id || !img || !img[0] || !nombre) {
                return (
                  <div
                    key={id || Math.random()}
                    className="bg-white p-4 rounded-lg shadow-lg"
                  >
                    <p className="text-red-500 text-center">
                      Producto no válido. Verifica tus datos.
                    </p>
                  </div>
                );
              }

              return (
                <div
                  onClick={() => navigate(`/producto/${id}`)}
                  key={id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                  <img
                    src={img[0]}
                    alt={nombre}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{nombre}</h3>
                    <p className="text-sm text-gray-600 mb-2">{categoria}</p>
                    <p className="text-sm text-gray-500">{ubicacion}</p>
                    <button
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: "REMOVE_FAV", payload: producto });
                      }}
                    >
                      Quitar de favoritos
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritos;
