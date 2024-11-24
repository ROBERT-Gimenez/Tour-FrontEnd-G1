// src/routes/SubComponentes/Categorias.jsx
import React, { useState } from "react";
import { useContextGlobal } from "../../components/utils/GlobalContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categorias = () => {
  const { state, dispatch } = useContextGlobal();
  const [categorias, setCategorias] = useState(state.catagorias || []);
  const [productos , setProductos ] = useState(state.productos || []);
  const navigate = useNavigate();

  
  
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
    <section className="mb-8 w-full p-4">
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

export default Categorias;
