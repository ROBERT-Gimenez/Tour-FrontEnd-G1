//src\routes\SubComponentes\ListaDeRecomendaciones.jsx
import React, { useState, useEffect } from "react";

const ListaDeRecomendaciones = () => {
  const [productos, setProductos] = useState([
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/ac/fe/ea.jpg",
      categoria: "Cultura",
      nombre: "Recorrido por los jardines de versalles",
      ubicacion: "Paris",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6f/4c/27.jpg",
      categoria: "Cultura",
      nombre: "Museo del Louvre",
      ubicacion: "Paris",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0f/70/dc/71.jpg",
      categoria: "Gastronomia",
      nombre:
        "Recorrido gastronómico a pie por París con visitas gastronómicas secretas",
      ubicacion: "Paris",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/7f/62/57.jpg",
      categoria: "Cultura",
      nombre: "Entrada para el Museo conmemorativo del 11-S",
      ubicacion: "Nueva York",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/07/f1/c6.jpg",
      categoria: "Gastronomia",
      nombre:
        "Recorrido gastronómico local ciudad de Nueva York dirigido por guías de la policía de Nueva York",
      ubicacion: "Nueva York",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/69/1e.jpg",
      categoria: "Arquitectura",
      nombre: "Mirador edge",
      ubicacion: "Nueva York",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/6c/b2/b0.jpg",
      categoria: "Gatronomia",
      nombre: "Royal High Tea en los jardines del Palacio de Kensington",
      ubicacion: "Londres",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/10/76/69/2c.jpg",
      categoria: "Cultura",
      nombre: "Sin marco: experiencia artística inmersiva en Londres",
      ubicacion: "Londres",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/75/6c/92.jpg",
      categoria: "Arquitectura",
      nombre: "Visita a pie a la Torre de Londres y el Tower Bridge",
      ubicacion: "Londres",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/41/53.jpg",
      categoria: "Cultura",
      nombre: "Excursión de Jack el Destripador con Ripper-Vision en Londres",
      ubicacion: "Londres",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/12/4f/54/e5.jpg",
      categoria: "Arquitectura",
      nombre: "Visita a la Estatua de la Libertad",
      ubicacion: "Nueva York",
    },
    {
      img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/84/81/c5.jpg",
      categoria: "Gastronomia",
      nombre: "Cata de vinos en París con almuerzo de queso y charcutería",
      ubicacion: "Paris",
    },
  ]);

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  // Función para generar productos aleatorios sin repetición
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

  return (
    <section className="mb-4 w-full p-2">
      <h2 className="text-2xl font-bold mb-4 text-center">Recomendaciones</h2>

      {productosPaginaActual.length === 0 ? (
        <p>No hay productos disponibles en esta página.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productosPaginaActual.map((producto, index) => (
            <div
              key={index}
              className="flex bg-[#ffff] rounded-lg shadow-md mb-4 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={producto.img}
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
          className="px-4 py-2 mx-1 mb-2 bg-[#e46d37] text-black rounded disabled:bg-gray-400 sm:px-6 sm:py-3 text-sm sm:text-base"
        >
          Anterior
        </button>
        <span className="px-4 py-2 mx-1 mb-2 text-sm sm:text-base">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 mx-1 mb-2 bg-[#e46d37] text-black rounded disabled:bg-gray-400 sm:px-6 sm:py-3 text-sm sm:text-base"
        >
          Siguiente
        </button>
        <button
          onClick={() => cambiarPagina(totalPaginas)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 mx-1 mb-2 bg-[#e46d37] text-black rounded disabled:bg-gray-400 sm:px-6 sm:py-3 text-sm sm:text-base"
        >
          Final
        </button>
      </div>
    </section>
  );
};

export default ListaDeRecomendaciones;
