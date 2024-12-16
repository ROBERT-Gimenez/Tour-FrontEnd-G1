import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import FormProduct from './FormProduct';
import { useContextGlobal } from '../../../utils/GlobalContext';


function ProductPopup({ item, onEdit, isEditing }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(isEditing ? { ...item } : {});
    const { state, dispatch } = useContextGlobal();

    const handleEditClick = () => {
      if (isEditing) {
        setFormData({ ...item });
      } else {
        setFormData({
          id:null,
          nombre: '', 
          img: [] , 
          categoriaId :'' ,
          ubicacion :'',
          precio : '',
          stock:0,
          comprados:0 ,
          caracteristicas:[] ,
          descripcion:'' ,
          fechasDisponibles : [],
        });
      }
      setIsOpen(true);
    };
  
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
    
      if (key === 'fechasDisponibles') {
        setFormData((prevData) => ({
          ...prevData,
          [key]: e,
        }));
        return;
      }
      if (key === 'categoriaId') {
        setFormData((prevData) => ({
          ...prevData,
          [key]: e?.value,
        }));
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [key]: e?.target?.value,
      }));
    };
    
  
    const handleImagesChange = (newImages) => {
      setFormData((prev) => ({ ...prev, img: newImages }));
    };
  
    const handleSave = () => {
      console.log(formData)
      onEdit(formData);
      setIsOpen(false);
    };
  
    return (
      <div>
        <button onClick={handleEditClick} className= {isEditing ? 'button-edit' : 'button-add'}>
          <FontAwesomeIcon icon={isEditing ? faEdit : faPlus} className="mr-2" />
          {isEditing ? 'Editar' : 'Agregar'}
        </button>

        {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-h-[95vh] max-w-[70%] overflow-y-auto relative z-60">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)} >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <div className="flex flex-wrap whitespace-normal mb-4">
              <h2 className="text-xl font-semibold">
                {isEditing ? `Editar paquete: ${item.nombre}` : 'Crear nuevo paquete'}
              </h2>
            </div>
            <FormProduct formData={formData} onFieldChange={handleFieldChange}
                onImagesChange={handleImagesChange}
            />
            <div className="flex justify-end mt-6 gap-[1rem]">
              <button type="button" className="btn-init" onClick={() => setIsOpen(false)}>
                Cancelar
              </button>

              <button type="button" className="btn-session" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  
  export default ProductPopup;