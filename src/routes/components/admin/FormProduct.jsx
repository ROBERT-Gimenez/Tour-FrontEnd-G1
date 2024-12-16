import React, { useEffect, useState } from "react";
import ImagenesForm from "./ImagenesForm";
import Select from 'react-select';
import { useContextGlobal } from "../../../utils/GlobalContext";
import MultiCalendarSelector from "../producto/MultiCalendarSelector";

export default function FormProduct({ formData, onFieldChange, onImagesChange }) {
  const { state, dispatch } = useContextGlobal();
  const [categorias, setCategorias] = useState(state.categorias || []);
  const [caracteristicas, setCaracteristicas] = useState(state.caracterisiticas || []);
  const [fechasDisponibles, setFechasDisponibles] = useState([{ fecha: "", stock: 0 ,duracionDias:0}]);


  useEffect(() => {
    setCategorias(state.categorias)
    setCaracteristicas(state.caracteristicas)
  }, []);

  useEffect(() => {
    onFieldChange(fechasDisponibles, 'fechasDisponibles')
  }, [fechasDisponibles]);


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
    label: (
        <div className="flex items-center gap-2">
            <img src={feature.icon} alt={feature.name} className="w-5 h-5" />
            <span>{feature.name}</span>
        </div>
    ),
}));

  const handleFieldChange = (e, key) => {
    if (key === 'caracteristicas') {
      const selectedValues = e.map((option) => option.value);
      setFormData((prevData) => ({
        ...prevData,
        [key]: selectedValues,
      }));
      dispatch('PUT_CARACTERISTICAS', { ...formData, [key]: selectedValues });
      return;
    }
  
    if (key === 'fecha') {
      setFormData((prevData) => ({
        ...prevData,
        [key]: e,
      }));
      return;
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [key]: e?.target?.value,
    }));
  };
  


  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    onFieldChange({ target: { value: value } }, "precio");
  };

  const handleRemoveFecha = (index) => {
    const newFechas = [...fechasDisponibles];
    newFechas.splice(index, 1);
    setFechasDisponibles(newFechas);
  };

    return (
      <form>
        <div className="grid grid-cols-4 gap-4">
        {Object.keys(formData).map((key) => {
         if (key === "imagenes" ||key === "img" || key === "puntuacionMedia" || key === "totalResenas" ||
          key === "id" || key ==="rating" || key === "FechasDisponibles") return null;

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

            {key !== "categoriaId" && key !== "caracteristicas" && key !== "precio" && key !== "fechasDisponibles" && (
              <input
                value={formData[key]}
                disabled={key === "comprados"}
                type={typeof formData[key] === "number" ? "number" : "text"}
                onChange={(e) => onFieldChange(e, key)}
                className={`border border-gray-300 rounded-lg p-2 w-full ${key === "comprados" ? "bg-gray-200" : ""}`}
                placeholder={`Editar ${key}`}
              />
            )}

            { formData.categoria && key == "categoria"  ? 
              (
                <Select
                options={categoriOptions}
                value={categoriOptions?.find(option => formData.categoria.id === option.value)}
                onChange={(e) => onFieldChange(e, key)}
                classNamePrefix="select"
                placeholder="Seleccione opciones..."
              />
            )
            : 
            ( !formData.categoria && key == "categoriaId" ) && (
                <Select
                options={categoriOptions}
                value={categoriOptions?.find(option => formData.categoriaId === option.value)}
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
            </div>
        );
        })}


      </div>
      
            <div className="fecha-container">
              <label className="section-title">Fechas disponibles</label>
                <div className="fecha-list">
                {fechasDisponibles.map((fechaDisponible, index) => (
                <div key={index} className="fecha-item">
                  <div className="input-group">
                    <label className="input-label">Fecha</label>
                    <input type="date" value={fechaDisponible.fecha} className=".input-field-dates"
                    onChange={(e) => setFechasDisponibles((prev) => prev.map((fd, i) =>
                    i === index ? { ...fd, fecha: e.target.value } : fd)
                    )}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Stock</label>
                    <input type="number"  placeholder="Stock" value={fechaDisponible.stock} className=".input-field-dates"
                      onChange={(e) => setFechasDisponibles((prev) =>
                        prev.map((fd, i) =>
                        i === index ? { ...fd, stock: e.target.value } : fd  )
                      )}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Duración en Días</label>
                    <input type="number" placeholder="Duración en Días"  value={fechaDisponible.duracionDias}
                      className=".input-field-dates" onChange={(e) => setFechasDisponibles((prev) =>
                      prev.map((fd, i) =>
                      i === index ? { ...fd, duracionDias: e.target.value } : fd)
                      )}
                    />
                  </div>
                  <button  type="button"  className="remove-button" onClick={() => handleRemoveFecha(index)} >
                    X
                  </button>
                  </div>
              ))}
              </div>
                <button type="button" className="add-button" 
                onClick={() => setFechasDisponibles([...fechasDisponibles, { fecha: "", stock: 0, duracionDias: 0 },]) 
                } >
                Agregar Fecha
              </button>
            </div>
            
          <ImagenesForm images={formData.img} onImagesChange={onImagesChange} />
      </form>
    );
  }

  /* 
     <MultiCalendarSelector
             onDatesChange={(updatedDates) => onFieldChange(updatedDates, 'fecha')}
             stock={formData.stock}
              />   
               */