import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useContextGlobal } from "../components/utils/GlobalContext";
import { GaleriaImagenes } from "../components/producto/GaleriaImagenes";
import { useEffect, useState } from "react";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContextGlobal();
  const { productos } = state;
  const [categorias, setCategorias] = useState(state.catagorias || []);
  const [caracteristicas, setCaracteristicas] = useState(state.caracterisiticas || []);
  const producto = productos.find((prod) => prod.id === parseInt(id));

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }
  useEffect(() => {
    if (state.caracteristicas) {
      setCaracteristicas(state.caracteristicas);
    }
  }, [state.caracteristicas]);

  // Map categories and characteristics to display names
  const categoriaNombre = categorias.find(categoria => categoria.id === producto.categoria)?.name;

  const caracteristicOptions = (caracteristicas || []).map(feature => ({
  value: feature.id,  
  label: `${feature.icon} ${feature.name}`, 
  }));

  const caracteristicasNombres = caracteristicOptions
    .filter(option => producto.caracteristicas?.includes(option.value))
    .map(option => option.label)
    .join(", ");

    
  return (
      <section className="mb-4 w-full p-4 min-h-[60vh] mt-8">
      <div className="flex items-center mb-4">
        <button onClick={handleBackClick} className="text-gray-600 hover:text-gray-900 mr-2">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <h2 className="text-lg md:text-2xl font-bold text-[rgb(75,85,99)] decoration-dotted decoration-2 mr-2">
          Destino {producto.ubicacion} :
        </h2>
        <h2 className="text-lg md:text-2xl font-bold text-[rgb(31,41,55)] transition duration-300">
          {producto.nombre}
        </h2>
      </div>
      <GaleriaImagenes images={producto.img} />

      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <p className="text-sm text-gray-600">{producto.descripcion}</p>

          {/* Cuadro para categoría y características */}
          <div className="mt-4 p-4 border rounded-md bg-gray-100">
            <p className="text-sm text-gray-800 font-bold">Categoría:</p>
            <p className="text-sm text-gray-600">{categoriaNombre || "Sin categoría"}</p>
            
            <p className="text-sm text-gray-800 font-bold mt-2">Características:</p>
            <p className="text-sm text-gray-600">
              {caracteristicasNombres || "Sin características"}
            </p>
          </div>

          <span className="text-gray-600 hover:text-gray-900 mr-2">Fecha : {producto.fecha}</span>
        </div>
      </div>
    </section>
  );
};