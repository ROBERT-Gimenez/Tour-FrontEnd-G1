import React, { useEffect, useState } from 'react';
import "./admin.css";

export const CharacteristicsForm = ({ onFeatureUpdate }) => {
    const [features, setFeatures] = useState([]);
    const [newFeature, setNewFeature] = useState({id:'', name: '', icon: '' });
    const [editingFeature, setEditingFeature] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenInputs, setIsOpenInputs] = useState(false);
  

    const mockFeatures = [
        { id: 1, name: 'Característica 1', icon: '🌟' },
        { id: 2, name: 'Característica 2', icon: '🚀' },
        { id: 3, name: 'Característica 3', icon: '💡' },
        { id: 4, name: 'Característica 4', icon: '🎨' },
        { id: 5, name: 'Característica 5', icon: '🔒' },
        { id: 6, name: 'Característica 6', icon: '⚙️' },
        { id: 7, name: 'Característica 7', icon: '📈' },
        { id: 8, name: 'Característica 8', icon: '💻' },
        { id: 9, name: 'Característica 9', icon: '🎯' },
        { id: 10, name: 'Característica 10', icon: '🌍' },
      ];
    
      useEffect(() => {
        setFeatures(mockFeatures);
        onFeatureUpdate(mockFeatures);
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
      const updatedFeatures = [...features, { ...newFeature, id: Date.now() }];
      setFeatures(updatedFeatures);
      setNewFeature({id:'', name: '', icon: '' });
      onFeatureUpdate(updatedFeatures);
      setIsOpenInputs(false);
    };
  
    const handleEditFeature = (feature) => {
      setEditingFeature(feature);
      setNewFeature({id:feature.id , name: feature.name, icon: feature.icon });
    };
  
    const handleSaveEdit = () => {
      const updatedFeatures = features.map((f) =>
        f.id === editingFeature.id ? newFeature : f
      );
      setFeatures(updatedFeatures);
      setEditingFeature(null);
      setNewFeature({id:'', name: '', icon: '' });
      onFeatureUpdate(updatedFeatures);
    };
  
    const handleDeleteFeature = (featureId) => {
      const updatedFeatures = features.filter((f) => f.id !== featureId);
      setFeatures(updatedFeatures);
      onFeatureUpdate(updatedFeatures);
    };
  
    const openModal = () => setIsModalOpen(true);
    const openInputs = () => setIsOpenInputs(true);
    const closeModal = () => {
      setIsModalOpen(false);
      setIsOpenInputs(false);
      setEditingFeature(null);
      setNewFeature({ name: '', icon: '' });
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
                      <button onClick={handleSaveEdit} className="button-add btn-add item2">
                        Guardar
                      </button>
                    ) : (
                      <>
                      <button  onClick={() => handleEditFeature(feature)}  className="button-edit btn-characterist" >
                        Editar
                      </button>
                      </>
                    )}
                      <button
                        onClick={() => handleDeleteFeature(feature.id)}
                        className="button-delete btn-characterist"
                      >
                        Eliminar
                      </button>
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
