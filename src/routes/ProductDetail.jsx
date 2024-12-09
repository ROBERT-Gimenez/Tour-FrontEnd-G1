import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft ,faHeadset  } from '@fortawesome/free-solid-svg-icons';
import { GaleriaImagenes } from "./components/producto/GaleriaImagenes";
import { useEffect, useState } from "react";
import Calendar2 from "./components/producto/Calendar2";
import StarRating from "./components/producto/StarRating";
import { useContextGlobal } from "../utils/GlobalContext";
/* import { AiFillHeart, AiOutlineHeart } from "react-icons";
 */
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

    const handleUpdateStock = (updatedStockData) => {
      setStockData(updatedStockData); // Actualiza el stock a nivel del componente padre
    };
    
  return (
      <section className="mb-4 w-full p-4 min-h-[60vh] mt-8">
        
      <div className="flex items-center mb-4  titulo-destino">
        <button onClick={handleBackClick} className="text-gray-600 hover:text-gray-900 mr-2">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <h2 className="text-lg md:text-2xl font-bold text-[rgb(75,85,99)] decoration-dotted decoration-2 mr-2 ">
          Destino {producto.ubicacion} :
        </h2>
        <h2 className="text-lg md:text-2xl font-bold text-[rgb(31,41,55)] transition duration-300">
          {producto.nombre}
        </h2>
        { state.user != "" &&  <button className="text-red-500 btn-heart"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorito(producto);
              }}
            >
              {/* {state.favs.some((fav) => fav.id === producto.id) ? (
                <AiFillHeart size={24} /> ) : ( <AiOutlineHeart size={24} />
                  )} */}
            </button>}
      </div>
          <StarRating rating={producto.rating} />


      
      <div className="content-image-detail">
        <GaleriaImagenes images={producto.imagenes} />

        <div className="flex flex-col md:flex-row content-description">
          <div className="content-caracteristic">
            <p className="text-sm text-gray-600">{producto.descripcion}</p>

            <div className="content-purple">
              <p className="text-sm text-gray-800 font-bold">Categoría:</p>
              <p className="text-sm text-gray-600">{categoriaNombre || "Sin categoría"}</p>
              
              <p className="text-sm text-gray-800 font-bold mt-2">Características:</p>
              <p className="text-sm text-gray-600">
                {caracteristicasNombres || "Sin características"}
              </p>
            </div>
          </div>
        </div> 
      </div>
        <div>
          <Calendar2 stockData={producto.fechasDisponible} onUpdateStock={handleUpdateStock} />
        </div> 
      <div className="price">
        <h3>
          Desde {producto.precio || ""}
        </h3>
      </div>
      <div className="btn-content">
        <button className="btn-submit-product">Reservar</button>
        <i>Asistencia al viajero <FontAwesomeIcon icon={faHeadset} size="lg" />
        </i>
      </div>
    </section>
  );
};