import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft ,faHeadset  } from '@fortawesome/free-solid-svg-icons';
import { GaleriaImagenes } from "./components/producto/GaleriaImagenes";
import { useEffect, useState } from "react";
import StarRating from "./components/producto/StarRating";
import axios from "axios";
import Calendar from "react-calendar";
import ProductPolicies from "./components/ProductPolicies";
import MisReservas from "./MisReservas";
import { useContextGlobal } from "../utils/GlobalContext";
import {  showConfirm, showErrorAlert, spinner } from "../api/alert";


export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [usuariosReservados, setUsuariosReservados] = useState([]);
  const {showLoginPopup}  = useContextGlobal()

  const handleBackClick = () => {
    navigate(-1);
  };



  useEffect(() => {
    spinner(true)
    axios
      .get(`https://proyectofinald-production.up.railway.app/travel/public/productos/${id}`) // Endpoint para obtener el producto completo
      .then(response => {
        setProducto(response.data)
        spinner(false)
      })
      .catch(error =>{
         console.error("Error al cargar el producto", error)
         showErrorAlert("Error al cargar el producto")
        });
  }, []);

  const today = new Date();

  const tileDisabled = ({ date }) => {
    return date < today; // Deshabilitar fechas pasadas
  };

  const tileClassName = ({ date }) => {
    if (!producto) return null;
    const dateString = date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
    const fecha = producto.fechasDisponibles.find(f => f.fecha === dateString);
    if (fecha) {
      return fecha.stock > 0 ? "disponible" : "tachada";
    }
    return null;
  };

  const onDateClick = (date) => {
    setFechaSeleccionada(null);
    const dateString = date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
    const fecha = producto.fechasDisponibles.find(f => f.fecha === dateString);
    if (fecha) {
      setFechaSeleccionada(fecha);
      cargarUsuariosReservados(fecha.id);
    }
  };

  const cargarUsuariosReservados = (fechaId) => {
    axios
      .get(`https://proyectofinald-production.up.railway.app/travel/public/reservas/usuarios?fechaDisponibleId=${fechaId}`)
      .then(response => setUsuariosReservados(response.data))
      .catch(error => console.error("Error al cargar usuarios reservados", error));
  };

  const realizarReserva = (fechaId) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (!token) {
      showLoginPopup()
      return;
    }
    spinner(true)
    axios
      .post(
        `https://proyectofinald-production.up.railway.app/travel/public/reservas?fechaDisponibleId=${fechaId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        spinner(false)
        showConfirm("Reserva realizada con éxito.")
        navigate(`/confirmacion-reserva?reservaId=${response.data.id}`); // Redirige a la página de confirmación
      })
      .catch((error) => {
        console.error("Error al realizar la reserva", error);
        showErrorAlert(error?.response?.data)
      });
  };

  const getImageSrc = (icon) => {
    if (icon instanceof File) {
        return URL.createObjectURL(icon);
    }
    return icon;
};

  const redirect = () => {
    navigate("/perfil")
  } 
  
   // Políticas del producto de tours
   const productPolicies = [
    { title: "Requisitos de Participación", description: "Debe presentar una identificación válida al momento del check-in. Los participantes deben ser mayores de 18 años, o contar con un acompañante adulto si son menores." },
    { title: "Política de Cancelación", description: "Las cancelaciones realizadas con más de 48 horas de antelación son elegibles para un reembolso completo. Cancelaciones dentro de las 48 horas previas no son reembolsables." },
    { title: "Restricciones de Equipaje", description: "No se permite llevar equipaje de gran tamaño. Se recomienda traer solo una mochila o bolso pequeño." },
    { title: "Código de Conducta", description: "Por favor, respete a otros participantes y guías durante el recorrido. Comportamientos inapropiados resultarán en la exclusión del tour sin reembolso." },
  ];

  if (!producto) return <p>Cargando producto...</p>;
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
       
      </div>
          <StarRating rating={producto.rating} />


      
      <div className="content-image-detail">
        <GaleriaImagenes images={producto.imagenes} />

        <div className="flex flex-col md:flex-row content-description">
          <div className="content-caracteristic">
            <p className="text-sm text-gray-600">{producto.descripcion}</p>

            <div className="content-purple">
              <p className="text-sm text-gray-800 font-bold">Categoría:</p>
              <p className="text-sm text-gray-600">{producto.categoria.name || "Sin categoría"}</p>
              
              <p className="text-sm text-gray-800 font-bold mt-2">Características:</p>
              <p className="text-sm text-gray-600">
              <ul className="ul-content">
          {producto.caracteristicas.map((caracteristica) => (
            <>
            <li className="caracteristic-content" key={caracteristica.id}>
            <img src={getImageSrc(caracteristica.icon)} alt="Ícono seleccionado" className="catalog-image-form" />
            <p>{caracteristica.name}</p>
            </li>
            </>
          ))}
        </ul>
              </p>
            </div>
          </div>
        </div> 
      </div>
        <div className="calendar-content">
        <Calendar    tileDisabled={tileDisabled}  tileClassName={tileClassName} onClickDay={onDateClick} />
        </div> 
        {fechaSeleccionada && (
  <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
    <h3 className="text-xl font-semibold mb-2">Información de la Reserva</h3>
    <p className="text-gray-700">Fecha: <span className="font-bold">{fechaSeleccionada.fecha}</span></p>
    <p className="text-gray-700">Duración: <span className="font-bold">{fechaSeleccionada.duracionDias} días</span></p>
    <p className="text-gray-700">Disponibilidad: <span className="font-bold">{fechaSeleccionada.stock - fechaSeleccionada.disponibilidad}</span></p>
    <p className="text-gray-700">Stock: <span className="font-bold">{fechaSeleccionada.stock}</span></p>

    {usuariosReservados.length > 0 ? (
      <>
        <h4 className="text-lg font-semibold mt-4">Usuarios que ya reservaron:</h4>
        <ul className="list-disc list-inside ml-5">
          {usuariosReservados.map((usuario, index) => (
            <li key={index} className="text-gray-700">
              {usuario.nombre} {usuario.apellido} - 
              <a onClick={redirect} className="text-blue-500 hover:underline"> Ver perfil</a>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <p className="text-gray-700">No hay usuarios reservados para esta fecha.</p>
    )}
  </div>
)}

<div className="price bg-white p-4 rounded-lg shadow-md mb-4">
  <h3 className="text-xl font-semibold">
    Desde <span className="font-bold">{producto.precio || ""}</span>
  </h3>
</div>

{fechaSeleccionada && (
  <div className="btn-content flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
    <button 
      className="btn-submit-product bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition duration-200" 
      onClick={() => realizarReserva(fechaSeleccionada.id) }
    >
      Reservar
    </button>
    <i className="flex items-center text-gray-600">
      Asistencia al viajero 
      <FontAwesomeIcon icon={faHeadset} size="lg" className="ml-1" />
    </i>
  </div>
)}
      {/* Bloque de políticas */}
      <ProductPolicies policies={productPolicies} />
    </section>
    
  );
};