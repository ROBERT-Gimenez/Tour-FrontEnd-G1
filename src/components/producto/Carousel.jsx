import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Carousel =  ({ images, onClose }) => {
  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 md:w-4/5 lg:w-3/5 xl:w-3/5 content-carousel relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 btn-close"
          onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img 
                src={image} 
                alt={`Imagen ${index + 1}`} 
                className="w-full h-auto object-cover rounded-lg" 
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;