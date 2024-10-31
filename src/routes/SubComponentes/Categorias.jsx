// src/routes/SubComponentes/Categorias.jsx
import React from "react";

const Categorias = () => {
  const listaCategorias = [
    {
      img: "https://th.bing.com/th/id/OIP.SO75k5W-ItUqYDh-VwuLPAHaE7?rs=1&pid=ImgDetMain", // Imagen de Cultura
      nombre: "Cultura",
    },
    {
      img: "https://gastronomicainternacional.com/wp-content/uploads/2020/04/gastronomia-7-1024x576.jpg", // Imagen de Gastronomía
      nombre: "Gastronomía",
    },
    {
      img: "https://th.bing.com/th/id/OIP.Td90_W8-W7JriJcSA-u39wHaEK?rs=1&pid=ImgDetMain", // Imagen de Arquitectura
      nombre: "Arquitectura",
    },
  ];

  return (
    <section className="mb-8 w-full p-4">
      <h2 className="text-4xl font-bold mb-6 text-center py-10">Categorías</h2>
      <div className="flex flex-wrap">
        {listaCategorias.map((categoria, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="bg-[#ffff] border-[#fff0c0] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
              {" "}
              <img
                src={categoria.img}
                alt={categoria.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-black-800">
                  {categoria.nombre}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categorias;
