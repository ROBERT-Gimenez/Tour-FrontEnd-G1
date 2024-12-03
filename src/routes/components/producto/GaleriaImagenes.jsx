import React, { useState } from 'react'
import Carousel from './Carousel';

export const GaleriaImagenes = ({ images }) => {
    const [isGalleryOpen, setGalleryOpen] = useState(false);

    const handleOpenGallery = () => {
      setGalleryOpen(true);
    };
  
    const handleCloseGallery = () => {
      setGalleryOpen(false);
    };

    return (
        <div className="w-full mt-4 content-galery-images">
          <div className="grid grid-cols-3 grid-rows-1 gap-2">
            <div className="col-span-2 row-span-1">
              <img
                src={images[0]}
                alt="Imagen Principal"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="col-start-3 row-start-1">
              <img
                src={images[1]}
                alt="Imagen 1"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="col-start-3 row-start-2">
              <img
                src={images[2]}
                alt="Imagen 2"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="col-start-1 row-start-2">
              <img
                src={images[3]}
                alt="Imagen 3"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="col-start-2 row-start-2">
              <img
                src={images[4]}
                alt="Imagen 4"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        
          <div className="flex justify-end mt-2">
            <button onClick={handleOpenGallery} className="text-blue-500 hover:underline">
              Ver Más
            </button>
          </div>
    
          {isGalleryOpen && <Carousel images={images} onClose={handleCloseGallery} />}
        </div>
      );
    };
