import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useContextGlobal } from '../utils/GlobalContext';

const DeletePopup = ({itemDelete, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { state, dispatch } = useContextGlobal();
    const [productos, setProductos] = useState(state.productos);

    const handleDeleteClick = () => {
        onDelete(itemDelete)
        setIsOpen(false);
        const updatedProducts = productos.filter((f) => f.id !== itemDelete.id);
        setProductos(updatedProducts);
        localStorage.setItem("productos", JSON.stringify(updatedProducts));
        window.location.reload()
        };

    

  return (
    <div>
        <button onClick={() => setIsOpen(true)} className="button-delete">
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Eliminar
        </button>
  
        {isOpen && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex flex-wrap whitespace-normal mb-4">
            <h2 className="text-xl font-semibold">
            ¿Desea eliminar el paquete: {itemDelete.nombre}?</h2>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={() => setIsOpen(false)} className="button-add">
            Cancelar
          </button>
          <button onClick={handleDeleteClick} className="button-delete flex items-center">
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Confirmar
          </button>
        </div>
      </div>
    </div>    
    )}
    </div>
        
  );
};
export default DeletePopup