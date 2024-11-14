import  { useEffect, useState } from 'react'
import React from 'react';
import "./admin.css";

export const CatalagoForm = ({onCatalogUpdate }) => {
    const [Catalogos, setCatalogo] = useState([]);
    const [newCatalogo, setNewCatalogo] = useState({id:'', name: '', image: null });
    const [editingCatalogo, setEditingCatalogo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenInputs, setIsOpenInputs] = useState(false);
  

    const mockCatalog = [
        {
            id: 1,
            name: 'Turismo en la Playa',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9TpkrYceO3HdO9uyc0fSEUhr4K_21vl0KA&s', 
          },
          {
            id: 2,
            name: 'Turismo de Aventura',
            image: 'https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpc2FqZSUyMG5hdHVyYWx8ZW58MHx8MHx8fDA%3D', 
          },
          {
            id: 3,
            name: 'Turismo Cultural',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-iQPWNssZFBbTQF3IRHWVYQuhXI-Fl881dg&s',
          },
          {
            id: 4,
            name: 'Turismo Gastronómico',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF0RA3hsQqso9Zjqcbi23ITemwKtJBWqw69w&s', 
          },
          {
            id: 5,
            name: 'Turismo de Naturaleza',
            image: 'https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg', 
          },
       ];
    
      useEffect(() => {
        setCatalogo(mockCatalog);
        onCatalogUpdate(mockCatalog);
      }, []);

      const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setNewCatalogo({
          ...newCatalogo,
          [name]: name === 'image' ? files[0] : value, 
        });
      };
  
    const handleAddCatalog = () => {
      if (!newCatalogo.name || !newCatalogo.image) {
        alert('Por favor, complete todos los campos');
        return;
      }
      const updatedFeatures = [...Catalogos, { ...newCatalogo, id: Date.now() }];
      setCatalogo(updatedFeatures);
      setIsOpenInputs(false);
      setNewCatalogo({id:'', name: '', image: '' });
      onFeatureUpdate(updatedFeatures);
      setIsOpenInputs(false);
    };
  
    const handleEditCatalog = (catalogo) => {
        setEditingCatalogo(catalogo);
        setNewCatalogo({id:catalogo.id , name: catalogo.name, image: catalogo.image });
    };
  
    const handleSaveEdit = () => {
      const updatedFeatures = Catalogos.map((f) =>
        f.id === editingCatalogo.id ? newCatalogo : f
      );
      setCatalogo(updatedFeatures);
      setEditingCatalogo(null);
      setNewCatalogo({id:'', name: '', image: '' });
      onFeatureUpdate(updatedFeatures);
    };
  
    const handleDeleteFeature = (featureId) => {
      const updatedFeatures = Catalogos.filter((f) => f.id !== featureId);
      setCatalogo(updatedFeatures);
      onFeatureUpdate(updatedFeatures);
    };
  
    const openModal = () => setIsModalOpen(true);
    const openInputs = () => setIsOpenInputs(!isOpenInputs);
    const closeModal = () => {
      setIsModalOpen(false);
      setIsOpenInputs(false);
      setEditingCatalogo(null);
      setNewCatalogo({ name: '', icon: '' });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setNewCatalogo({ ...newCatalogo, image: reader.result });
          };
          reader.readAsDataURL(file);
        }
      };
  
    return (
      <div className="characteristics-form">
        <button onClick={openModal} className="btn-open-characterist">
           Catalogos
        </button>
        {isModalOpen && (
        <div className="modal-overlay">
            <div className="modal-content model-catalog">
                <div className='header-catalog'>
                <div className='content-title'>

                    <h2 className="text-xl font-bold mb-4 item1">Administrar Catalogos</h2>
                    {!isOpenInputs &&
                    <button onClick={openInputs} className="button-add btn-add item2">
                        <i className="fa fa-plus" aria-hidden="true"></i> Añadir
                    </button>
                    }
                </div>
                {isOpenInputs && (
                    
                  <>
                    <div className='content-catalog-form'>
                        <div className="catalog-form mb-4 item2">
                            <input
                                type="text"
                                name="name"
                                value={newCatalogo.name}
                                onChange={handleInputChange}
                                placeholder="Nombre del Catálogo"
                                className="input-field-form"
                                />
                            <div className="input-group content-preview-image">
                                {newCatalogo.image && (
                                    <img src={newCatalogo.image} alt="Imagen seleccionada" className="catalog-image-form " />
                                )}
                                <label htmlFor="image-upload" className="upload-label">
                                    <i className="fa fa-upload" aria-hidden="true"></i> Subir Imagen
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="input-image hide-input-image"
                                    />
                            </div>
                        </div>
                        <div className='content-btns-form'>
                            <button onClick={openInputs} className="button-close item1">
                                Cancelar
                            </button>
                            <button onClick={handleAddCatalog} className="button-add btn-add ">
                                + agregar
                            </button>
                        </div>
                    </div>
                    <hr/>
                    </>
                )}
                </div>
                {/* Listado  */}
                {!isOpenInputs && (
                <>
                <ul className="feature-list">
                    {Catalogos.map((catalogo) => (
                    <li key={catalogo.id} className="feature-item flex justify-between items-center">
                    <input
                        type="text"
                        name="name"
                        value={editingCatalogo && newCatalogo.id == catalogo.id ? newCatalogo.name :catalogo.name }
                        onChange={handleInputChange}
                        className={"input-field " +   (newCatalogo.id == catalogo.id ? "selected-input" : "") }
                        disabled ={!editingCatalogo || !(newCatalogo.id == catalogo.id) }
                    />
                    {(newCatalogo.id != catalogo.id) ? (
                        catalogo.image && <img src={catalogo.image} alt="Catalog" className="catalog-image" />
                        ) : (
                            <div className='content-preview-image'>
                            {newCatalogo.image && <img src={newCatalogo.image} alt="Imagen seleccionada" className='catalog-image' />}
                            <input
                            type="file"
                            id="image-upload"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="input-image  hide-input-image"
                            />
                            <label htmlFor="image-upload" className="upload-label">
                                    <i className="fa fa-upload" aria-hidden="true"></i> Cambiar Imagen
                            </label>
                          </div>
                    )}
                    <div className="feature-actions flex gap-2">
                      
                      {editingCatalogo && newCatalogo.id == catalogo.id ? (
                      <button onClick={handleSaveEdit} className="button-add btn-add item2">
                        Guardar
                      </button>
                    ) : (
                      <>
                      <button  onClick={() => handleEditCatalog(catalogo)}  className="button-edit btn-characterist" >
                        Editar
                      </button>
                      </>
                    )}
                      <button
                        onClick={() => handleDeleteFeature(catalogo.id)}
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
              </>   
            )}
            </div>
        </div>
      )}
    </div>
  );
}
