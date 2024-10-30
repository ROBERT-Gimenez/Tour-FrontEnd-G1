import React from "react";
import ImagenesForm from "./ImagenesForm";

export default function FormProduct({ formData, onFieldChange, onImagesChange }) {

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    onFieldChange({ target: { value: value } }, "precio");
  };

    return (
      <form>
        <div className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => {
          if (key === "img" || key === "id") return null;

          return (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>

              {key === "precio" ? (
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="text"
                    value={formData[key]}
                    onChange={handlePriceChange}
                    className="border border-gray-300 rounded-lg p-2 pl-8 w-full"
                    placeholder="Editar precio"
                    pattern="^\d+$"
                  />
                </div>
              ) : key === "fecha" ? (
                <input
                  type="date"
                  value={formData[key]}
                  onChange={(e) => onFieldChange(e, key)}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  placeholder="Seleccionar fecha"
                />
              ) : (
                <input
                  value={formData[key]}
                  disabled={key === "comprados"}
                  type={typeof formData[key] === "number" ? "number" : "text"}
                  onChange={(e) => (key !== "comprados" ? onFieldChange(e, key) : null)}
                  className={`border border-gray-300 rounded-lg p-2 w-full ${key === "comprados" ? "bg-gray-200" : ""}`}
                  placeholder={`Editar ${key}`}
                />
              )}
            </div>
          );
        })}
      </div>
          <ImagenesForm images={formData.img} onImagesChange={onImagesChange} />
      </form>
    );
  }