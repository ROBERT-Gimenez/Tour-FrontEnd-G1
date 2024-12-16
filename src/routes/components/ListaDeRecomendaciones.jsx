import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextGlobal } from "../../utils/GlobalContext";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { spinner } from "../../api/alert";

const ListaDeRecomendaciones = () => {
  const { state , dispatch } = useContextGlobal();
  const [productos, setProductos] = useState(state.productos);
  const [categorias, setCategorias] = useState( JSON.parse(localStorage.getItem("catagorias")) || state.categorias);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);

  const productosPorPagina = 10;
  const navigate = useNavigate();

  useEffect(() => {
    spinner(loading)
  }, [loading]);

  useEffect(() => {
    setProductos(state.productos)
    if(state.productos.length <= 0){
      setLoading(true)
    }
  }, [state]);

  useEffect(() => {
    filtrarProductos();
  }, [productos, selectedCategories, paginaActual]);

  const filtrarProductos = () => {
    const filtrados =
      selectedCategories.length === 0
        ? productos
        : productos.filter((producto) =>
            selectedCategories.includes(
              categorias.find((cat) => cat.id === producto.categoria)?.name
            )
          );

    setProductosFiltrados(filtrados);
    setPaginaActual(1);
  };

  const handleCategoryToggle = (categoria) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoria)
        ? prevSelected.filter((cat) => cat !== categoria)
        : [...prevSelected, categoria]
    );
  };

  const handleMostrarTodos = () => {
    setSelectedCategories([]);
    setPaginaActual(1);
  };

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual((prev) => Math.max(1, Math.min(numeroPagina, totalPaginas)));
  };

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;

  const productosPaginaActual = productosFiltrados?.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(productosFiltrados?.length / productosPorPagina);

  const toggleFavorito = (producto) => {
    const isFavorito = state.favs.some((fav) => fav.id === producto.id);
  
    if (isFavorito) {
      dispatch({ type: "REMOVE_FAV", payload: producto });
    } else {
      dispatch({ type: "ADD_FAV", payload: producto });
    }
  };
  


  return (
    <section className="mb-4 w-full p-2">
      <h2 className="text-4xl font-bold mb-4 text-center py-10">
        Recomendaciones
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mb-6 pt-12">
        <button
          onClick={handleMostrarTodos}
          className={`px-4 py-2 rounded-lg border ${
            selectedCategories.length === 0
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } transition-transform transform hover:scale-105`}
        >
          Todos los productos
        </button>
        {categorias?.map((categoria) => (
          <button
          key={categoria.id}
          className={`px-4 py-2 rounded-lg border ${
            selectedCategories.includes(categoria.name)
            ? "bg-[rgb(188,172,120)] text-white"
            : "bg-gray-200 text-gray-700"
          } transition-transform transform hover:scale-105`}
          onClick={() => handleCategoryToggle(categoria.name)}
          >
            {categoria.name}
          </button>
        ))}
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
        {productosPaginaActual?.map((producto) => (
        <div
          key={producto.id}
          className="flex bg-[#D9D9D9] rounded-lg shadow-md mb-4 hover:scale-105 hover:shadow-2xl cursor-pointer"
          onClick={() => navigate(`/producto/${producto.id}`)}
        >
         {producto?.imagenes && (
            <img
              src={producto.imagenes[0]}
              alt="imagen producto"
              className="w-1/3 h-auto object-cover rounded-l-lg"
            />
          )}
          <div className="flex flex-col justify-between p-4 w-2/3">
            <h3 className="text-sm text-gray-600">{producto.categoria.name}</h3>
            <h2 className="text-lg font-bold">{producto.nombre}</h2>
            <p className="text-sm text-gray-600">{producto.ubicacion}</p>
            {/* Botón de corazón para agregar a favoritos */}
            { state.user != "" && 
            <button
              className="text-red-500 btn-heart"
              onClick={(e) => {
                e.stopPropagation(); // Para evitar que se active el click en el producto
                toggleFavorito(producto);
              }}
            >
              {state.favs.some((fav) => fav.id === producto.id) ? (
                <AiFillHeart size={24} />
              ) : (
                <AiOutlineHeart size={24} />
              )}
            </button>
            }
          </div>
        </div>
      ))}
        </div>
        {productosFiltrados?.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No hay productos disponibles para las categorías seleccionadas.
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4 flex-wrap">
        <button
          onClick={() => cambiarPagina(1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 mx-1 mb-2 bg-[#6da590] text-black rounded disabled:bg-gray-400 sm:px-6 sm:py-3 text-sm sm:text-base"
        >
          Inicio
        </button>
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 mx-1 mb-2 bg-[#544013] text-black rounded disabled:bg-gray-400 sm:px-6 sm:py-3 text-sm sm:text-base"
        >
          Anterior
        </button>
        <span className="px-4 py-2 mx-1 mb-2 text-sm sm:text-base">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 mx-1 mb-2 bg-[#544013] text-black rounded disabled:bg-gray-400 sm:px-6 sm:py-3 text-sm sm:text-base"
        >
          Siguiente
        </button>
        <button
          onClick={() => cambiarPagina(totalPaginas)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 mx-1 mb-2 bg-[#544013] text-black rounded disabled:bg-gray-400 sm:px-6 sm:py-3 text-sm sm:text-base"
        >
          Final
        </button>
      </div>
    </section>
  );
};

export default ListaDeRecomendaciones;
