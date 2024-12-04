import React, { useEffect, useState } from "react";
import ImagenesForm from "./ImagenesForm";
import Select from 'react-select';
import { useContextGlobal } from "../../../utils/GlobalContext";
import MultiCalendarSelector from "../producto/MultiCalendarSelector";

export default function FormProduct({ formData, onFieldChange, onImagesChange }) {
  const { state, dispatch } = useContextGlobal();
  const [categorias, setCategorias] = useState(state.catagorias || []);
  const [caracteristicas, setCaracteristicas] = useState(state.caracterisiticas || []);


  useEffect(() => {
    const storedCategorias = JSON.parse(localStorage.getItem("categorias"));
    if (storedCategorias) {
      setCategorias(storedCategorias);
    } else {
      dispatch({ type: "GET_CATEGORIAS" });
    }
  }, []);

  useEffect(() => {
    const storedCaracteristicas = JSON.parse(localStorage.getItem("caracteristicas"));
    if (storedCaracteristicas) {
      setCaracteristicas(storedCaracteristicas);
    } else {
      dispatch({ type: "GET_CARACTERISTICAS" });
    }
  }, []);

  useEffect(() => {
    if (state.caracteristicas) {
      setCaracteristicas(state.caracteristicas);
    }
  }, [state.caracteristicas]);

  const categoriOptions = (categorias || []).map(categoria => ({
    value: categoria.id,
    label: categoria.name,
  }));

  const caracteristicOptions = (caracteristicas || []).map(feature => ({
    value: feature.id,  
    label: `${feature.icon} ${feature.name}`, 
  }));


  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    onFieldChange({ target: { value: value } }, "precio");
  };

    return (
      <form>
        <div className="grid grid-cols-3 gap-4">
        {Object.keys(formData).map((key) => {
         if (key === "img" || key === "id" || key ==="rating") return null;

        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {key === "precio" && (
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
            )}

            {key !== "categoria" && key !== "caracteristicas" && key !== "precio" && key !== "fecha" && (
              <input
                value={formData[key]}
                disabled={key === "comprados"}
                type={typeof formData[key] === "number" ? "number" : "text"}
                onChange={(e) => onFieldChange(e, key)}
                className={`border border-gray-300 rounded-lg p-2 w-full ${key === "comprados" ? "bg-gray-200" : ""}`}
                placeholder={`Editar ${key}`}
              />
            )}

            {key === "categoria" && (
                <Select
                options={categoriOptions}
                value={categoriOptions?.filter(option => formData.categoria === option.value)}
                onChange={(e) => onFieldChange(e, key)}
                classNamePrefix="select"
                placeholder="Seleccione opciones..."
              />
            )}

            {key === "caracteristicas" && (
              <Select
              isMulti
              options={caracteristicOptions}
              value={caracteristicOptions.filter(option => formData.caracteristicas?.includes(option.value))}
              onChange={(e) => onFieldChange(e, key)}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Seleccione opciones..."
            />
            )}
            {key === 'fecha' && (
             <MultiCalendarSelector
             onDatesChange={(updatedDates) => onFieldChange(updatedDates, 'fecha')}
             stock={formData.stock}
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