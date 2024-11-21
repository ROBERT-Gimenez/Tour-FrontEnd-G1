// src/routes/SubComponentes/Categorias.jsx
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContextGlobal } from "../../components/utils/GlobalContext";

const Categorias = () => {
  const { state, dispatch } = useContextGlobal();
  const [categorias, setCategorias] = useState(state.catagorias || []);
  const [productos , setProductos ] = useState(state.productos || []);
  const [selectedCategories, setSelectedCategories] = useState([]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  const handleCategoryToggle = (categoria) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoria)
        ? prevSelected.filter((cat) => cat !== categoria)
        : [...prevSelected, categoria] 
    );
  };

  const filteredProductos = productos.filter((producto) => {
    const categoriaProducto = categorias.find(
      (cat) => cat.id === producto.categoria
    )?.name;

    return (
      selectedCategories.length === 0 ||
      selectedCategories.includes(categoriaProducto)
    );
  });

  return (
    <section className="mb-8 w-full p-4">
        <section className="mb-8 w-full p-4">
        <h2 className="text-4xl font-bold mb-6 text-center py-10">Categorías</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categorias.map((categoria) => (
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
        <Slider {...settings}>
          {categorias.map((categoria, index) => (
            <div key={index} className="p-4 content-image">
              <div className="bg-white border-[#fff0c0] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
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
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
            {filteredProductos.map((producto, index) => (
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
          {filteredProductos.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No hay productos disponibles para las categorías seleccionadas.</p>
          )}
        </div>
      </section>
      
    </section>
  );
};

export default Categorias;
