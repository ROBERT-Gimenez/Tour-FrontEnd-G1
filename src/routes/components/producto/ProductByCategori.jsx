import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./producto.css"

const ProductByCategori = () => {
    const { id } = useParams(); 
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios.get(`http://localhost:8080/travel/public/categorias/${id}`)
        .then((response) => {
          setProductos(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Hubo un error al cargar los productos');
          setLoading(false);
        });
    }, [id]);
  
    if (loading) {
      return <div>Cargando productos...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <h1>Lista de Productos de la Categoría {id}</h1>
        <div className="productos-lista">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img src={producto.image} alt={producto.name} />
              <h3>{producto.name}</h3>
              <p>{producto.descripcion ? producto.descripcion : 'Descripción no disponible'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ProductByCategori;