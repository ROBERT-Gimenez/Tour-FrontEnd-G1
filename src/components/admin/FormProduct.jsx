import React from "react";
import GaleriaImagenes from "./GaleriaImagenes";

export default function FormProduct({ formData, onFieldChange, onImagesChange }) {
    return (
      <form>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => {
            if (key === "img") return null;
  
            return (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input value={formData[key]} disabled={key === "comprados" }
                type={typeof formData[key] === "number" ? "number" : "text"}
                onChange={(e) => (key !== "comprados" ? onFieldChange(e, key) : null)}
                className={`border border-gray-300 rounded-lg p-2 w-full ${key === "comprados" ? "bg-gray-200" : ""}`} 
                placeholder={`Editar ${key}`}
                />
              </div>
            );
          })}
        </div>
          <GaleriaImagenes images={formData.img} onImagesChange={onImagesChange} />
      </form>
    );
  }