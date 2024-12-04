import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ImagenesForm({ images, onImagesChange }) {
    const [newImageUrl, setNewImageUrl] = useState("");
  
    const handleArrayChange = (index, value) => {
      const updatedImages = [...images];
      updatedImages[index] = value;
      onImagesChange(updatedImages);
    };
  
    const addImageField = () => {
      onImagesChange([...images, newImageUrl]);
      setNewImageUrl("");
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            onImagesChange([...images, reader.result]);
          };
          reader.readAsDataURL(file);
        });
      };
    
      const removeImageField = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        onImagesChange(updatedImages);
      };

  
    return (
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imágenes
        </label>
        <div className="grid grid-cols-2 gap-4">
          {images.map((url, index) => (
            <div key={index} className="flex flex-col items-center">
              <input type="text"  value={url} className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                onChange={(e) => handleArrayChange(index, e.target.value)}
                placeholder="URL de la imagen"
              />
              {url && (
                <img  src={url} alt={`Imagen ${index + 1}`}
                   className="w-full h-32 object-cover rounded-lg"
                />
              )}
              <button type="button"  className="text-red-500 text-sm mt-2"
                 onClick={() => removeImageField(index)} >
                <FontAwesomeIcon icon={faTrash} />
                Eliminar
              </button>
            </div>
          ))}
        </div>
  
        <div className="flex items-center gap-4 mt-4">
          <input  type="text"  value={newImageUrl}
           onChange={(e) => setNewImageUrl(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Ingresar URL de nueva imagen"
          />
          <button  type="button" onClick={addImageField}
            className="text-blue-500 text-sm flex items-center"
            disabled={!newImageUrl} >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Agregar
          </button>
        </div>
      
        <div className="mt-4 w-[87%]">
            <input type="file" accept="image/*" className="border border-gray-300 rounded-lg p-2 w-full"
            onChange={handleImageUpload}
            />
        </div>
    </div>
    );
  }
