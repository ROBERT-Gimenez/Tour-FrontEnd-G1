import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Resultados = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);

  const query = queryParams.get('query');
  const fechaInicio = queryParams.get('fechaInicio');
  const fechaFin = queryParams.get('fechaFin');

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      try {
        // Construcción dinámica de la URL
        let url = `https://proyectofinald-production.up.railway.app/travel/public/productos/disponibles?`;
        if (fechaInicio) url += `fechaInicio=${fechaInicio}&`;
        if (fechaFin) url += `fechaFinal=${fechaFin}&`;
        if (query) url += `query=${query}`;

        // Eliminamos posibles caracteres residuales (& al final)
        url = url.endsWith("&") ? url.slice(0, -1) : url;

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setResultados(data);
        } else {
          console.error("No se encontraron resultados");
          setResultados([]);
        }
      } catch (error) {
        console.error("Error al obtener los resultados:", error);
        setResultados([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, [query, fechaInicio, fechaFin]);

  const handleProductoClick = (productoId) => {
    navigate(`/producto/${productoId}`); // Redirige a la página de detalle del producto
  };

  return (
    <section className="mb-4 w-full p-2">
      <h2 className="text-4xl font-bold mb-4 text-center py-10">
        Resultados de búsqueda
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : resultados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resultados.map((producto, index) => (
            <div
              key={index}
              className="flex bg-[#D9D9D9] rounded-lg shadow-md mb-4 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleProductoClick(producto.id)} // Manejar clic en producto
            >
              {producto.imagenes?.length > 0 && (
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="w-1/3 h-auto object-cover rounded-l-lg"
                />
              )}
              <div className="flex flex-col justify-between p-4 w-2/3">
                <h3 className="text-sm text-gray-600">Precio: ${producto.precio}</h3>
                <h2 className="text-lg font-bold">{producto.nombre}</h2>
                <p className="text-sm text-gray-600">{producto.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No se encontraron resultados para la búsqueda.
        </p>
      )}
    </section>
  );
};

export default Resultados;



