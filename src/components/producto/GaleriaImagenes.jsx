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
        <div className="w-full mt-4">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="md:w-1/2 ">
              <img
                src={images[0]}
                alt="Imagen Principal"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 grid-rows-2 p-2"> 
                {images.slice(1, 5).map((img, index) => (
                    <div key={index} className="h-48">
                    <img
                    src={img}
                    alt={`Imagen ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg p-1"
                    />
            </div>
  ))}
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
