//src\routes\SubComponentes\ListaDeRecomendaciones.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextGlobal } from "../../components/utils/GlobalContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListaDeRecomendaciones = () => {
  const { state, dispatch } = useContextGlobal();
  const [productos, setProductos] = useState(state.productos);
  const [categorias, setCategorias] = useState(state.catagorias || []);
  const navigate = useNavigate();

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  const generarProductosAleatorios = () => {
    const productosMezclados = [...productos].sort(() => 0.5 - Math.random());
    setProductosAleatorios(productosMezclados);
  };

  useEffect(() => {
    generarProductosAleatorios();
  }, [productos]);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginaActual = productosAleatorios.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(
    productosAleatorios.length / productosPorPagina
  );

  const cambiarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="mb-4 w-full p-2">
      <h2 className="text-4xl font-bold mb-4 text-center py-10">
        Recomendaciones
      </h2>

      {productosPaginaActual.length === 0 ? (
        <p>No hay productos disponibles en esta página.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productosPaginaActual.map((producto, index) => (
            <div
              key={index}
              className="flex bg-[#D9D9D9] rounded-lg shadow-md mb-4 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => navigate(`/producto/${producto.id}`)}
            >
              <img
                src={producto.img[0]}
                alt="imagen producto"
                className="w-1/3 h-auto object-cover rounded-l-lg"
              />
              <div className="flex flex-col justify-between p-4 w-2/3">
                <h3 className="text-sm text-gray-600">{producto.categoria}</h3>
                <h2 className="text-lg font-bold">{producto.nombre}</h2>
                <p className="text-sm text-gray-600">{producto.ubicacion}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Controles de paginación */}
      <div className="flex justify-center mt-4 flex-wrap">
        <button
          onClick={() => cambiarPagina(1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 mx-1 mb-2 bg-[#6da590]text-black rounded disabled:bg-gray-400 sm:px-6 sm:py-3 text-sm sm:text-base"
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
      <h2 className="text-4xl font-bold text-center py-5">Categorías</h2>

      <Slider {...settings}>
          {categorias.map((categoria, index) => (
            <div key={index} className="p-4 content-image">
              <div className="categori-img">
                <img
                  src={categoria.image}
                  alt={categoria.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-3 text-black-800">
                    {categoria.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
    </section>
  );
};

export default ListaDeRecomendaciones;
