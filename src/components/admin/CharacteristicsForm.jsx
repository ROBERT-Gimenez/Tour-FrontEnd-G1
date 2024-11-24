import React, { useEffect, useState } from 'react';
import "./admin.css";
import { useContextGlobal } from '../utils/GlobalContext';
import axios from 'axios';

export const CharacteristicsForm = () => {
    const { state, dispatch } = useContextGlobal();
    const [features, setFeatures] = useState([state.caracteristicas]);
    const [newFeature, setNewFeature] = useState({id:'', name: '', icon: '' });
    const [editingFeature, setEditingFeature] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenInputs, setIsOpenInputs] = useState(false);
  
    const authHeader = {
      Authorization: 'Basic ' + btoa('user@travel.com:user123')
    };

    useEffect(() => {
      axios.get('http://localhost:8080/travel/public/caracteristicas')
        .then((response) => {
          setFeatures(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener características:", error);
        });
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewFeature({ ...newFeature, [name]: value });
    };
  
    const handleAddFeature = () => {
      if (!newFeature.name || !newFeature.icon) {
        alert('Por favor, complete todos los campos');
        return;
      }
      const isDuplicateName = features.some(
        (characteristic) => characteristic?.name === newFeature.name && characteristic?.id !== newFeature.id
      );
      if (isDuplicateName) {
        alert("Ya existe una característica con ese nombre. Por favor, elija un nombre diferente.");
        return;
      }
  
      axios.post('http://localhost:8080/travel/public/caracteristicas', newFeature)
        .then((response) => {
          setFeatures([...features, response.data]);
          dispatch("PUT_CARACTERISTICAS", [...features, response.data]);
          setNewFeature({ id: '', name: '', icon: '' });
          setIsOpenInputs(false);
        })
        .catch((error) => {
          console.error("Error al agregar la característica:", error);
        });
    };
  
    const handleEditFeature = (feature) => {
      setEditingFeature(feature);
      setNewFeature({ id: feature.id, name: feature.name, icon: feature.icon });
    };
  
    const handleSaveEdit = () => {
      axios.put(`http://localhost:8080/travel/public/caracteristicas/${editingFeature.id}`, newFeature)
        .then((response) => {
          const updatedFeatures = features.map((f) =>
            f.id === editingFeature.id ? response.data : f
          );
          setFeatures(updatedFeatures); 
          dispatch("PUT_CARACTERISTICAS", updatedFeatures);
          setEditingFeature(null);
          setNewFeature({ id: '', name: '', icon: '' });
        })
        .catch((error) => {
          console.error("Error al editar la característica:", error);
        });
    };
  
     const handleDeleteFeature = (featureId) => {
    axios.delete(`http://localhost:8080/travel/public/caracteristicas/${featureId}`, { headers: authHeader })
      .then(() => {
        const updatedFeatures = features.filter((f) => f.id !== featureId);
        setFeatures(updatedFeatures);
        dispatch("PUT_CARACTERISTICAS", updatedFeatures);
      })
      .catch((error) => {
        console.error("Error al eliminar la característica:", error);
      });
  };
  
    const openModal = () => setIsModalOpen(true);
    const openInputs = () => setIsOpenInputs(true);
    const closeModal = () => {
      
      setIsModalOpen(false);
      setIsOpenInputs(false);
      setEditingFeature(null);
      setNewFeature({ name: '', icon: '' });
      window.location.reload()
    };
  
    return (
      <div className="characteristics-form">
        <button onClick={openModal} className="btn-open-characterist">
           Características
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className='header-characterist'>
                <h2 className="text-xl font-bold mb-4 item1">Administrar Características</h2>
  
                {isOpenInputs ? (
                  <>
                    <button onClick={handleAddFeature} className="button-add btn-add item2">
                        + agregar
                    </button>
                    <div className="feature-form mb-4 item2">
                        <input
                            type="text"
                            name="name"
                            value={newFeature.name}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="icon"
                            value={newFeature.icon}
                            onChange={handleInputChange}
                            placeholder="Ícono"
                            className="input-field"
                        />
                    </div>
                    <hr />
                  </>
                ) : (
                  <button onClick={openInputs} className="button-add btn-add item2">
                    <i className="fa fa-plus" aria-hidden="true"></i> Añadir
                  </button>
                )}
              </div>
  
              <ul className="feature-list">
                {features.map((feature) => (
                  <li key={feature.id} className="feature-item flex justify-between items-center">
                   <input
                        type="text"
                        name="name"
                        value={editingFeature && newFeature.id == feature.id ? newFeature.name :feature.name }
                        onChange={handleInputChange}
                        className="input-field"
                        disabled ={!editingFeature}
                    />
                   <input
                        type="text"
                        name="icon"
                        value={editingFeature && newFeature.id == feature.id ? newFeature.icon : feature.icon}
                        onChange={handleInputChange}
                        className="input-field"
                        disabled ={!editingFeature && newFeature.id == feature.id}
                    />

                    <div className="feature-actions flex gap-2">
                      
                      {editingFeature && newFeature.id == feature.id ? (
                        <>
                      <button onClick={handleSaveEdit} className="button-add btn-add item2">
                        Guardar
                      </button>
                      <button
                        onClick={() => handleEditFeature()}
                        className="button-delete btn-characterist"
                      >
                        Cancelar
                      </button>
                        </>
                    ) : (
                      <>
                      <button  onClick={() => handleEditFeature(feature)}  className="button-edit btn-characterist" >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteFeature(feature.id)}
                        className="button-delete btn-characterist"
                      >
                        Eliminar
                      </button>
                      </>
                    )}

                      
                    </div>
                  </li>
                ))}
              </ul>

              <button onClick={closeModal} className="button-close">
                Cerrar
              </button>
            </div>
          </div>
      )}
    </div>
  );
}
