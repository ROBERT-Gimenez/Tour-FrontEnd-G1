import React from 'react'
import { useContextGlobal } from '../utils/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Favoritos = () => {
    const { state, dispatch } = useContextGlobal();
    const navigate = useNavigate();
    return (
        <>
        <div className='content-fav'>
        <h1 className="text-3xl font-bold text-center mb-6">Productos Favoritos</h1>
        <div className="container mx-auto p-10">
          {state.favs.length === 0 ? (
              <p className="text-center text-xl text-gray-500">No tienes productos favoritos aún.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.favs.map((producto) => (
                  <div onClick={() => navigate(`/producto/${producto.id}`)}
                  key={producto.id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                  >
                  <img
                    src={producto.img[0]}
                    alt={producto.nombre}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{producto.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-2">{producto.categoria}</p>
                    <p className="text-sm text-gray-500">{producto.ubicacion || "Ubicación no disponible"}</p>
                    <button
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                      onClick={() => dispatch({ type: "REMOVE_FAV", payload: producto })}
                    >
                      Quitar de favoritos
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
        </>
      );
    };

export default Favoritos;
