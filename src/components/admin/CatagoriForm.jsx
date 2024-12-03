import  { useEffect, useState } from 'react'
import React from 'react';
import "./admin.css";
import { useContextGlobal } from '../utils/GlobalContext';
import axios from 'axios';

export const CatalagoForm = () => {
    const { state, dispatch } = useContextGlobal();
    const [categorias, setCategorias] = useState(state.catagorias || []);
    const [newCatalogo, setNewCatalogo] = useState({id:'', name: '', image: null , descripcion:'' });
    const [editingCatalogo, setEditingCatalogo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenInputs, setIsOpenInputs] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("authToken"))); 

    useEffect(() => {
      setCategorias(state.categorias || []);
    }, [state.categorias]);
    
    const handleInputChange = (e) => {
      const { name, value, files } = e.target;
      setNewCatalogo({
        ...newCatalogo,
        [name]: name === 'image' ? files[0] : value,
      });
    };
  
    const handleAddCatalog = async () => {
      if (!newCatalogo.name || !newCatalogo.image) {
        alert('Por favor, complete todos los campos');
        return;
      }
  
      const isDuplicateName = categorias.some(
        (categoria) => categoria?.name === newCatalogo.name && categoria?.id !== newCatalogo.id
      );
      if (isDuplicateName) {
        alert('Ya existe una categoria con ese nombre. Por favor, elija un nombre diferente.');
        return;
      }
  
      const formData = new FormData();
      formData.append('name', newCatalogo.name);
      formData.append('descripcion', newCatalogo.descripcion);
      formData.append('image', null);
  
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8080/travel/public/categorias', formData,
          {headers: { Authorization: `Bearer ${token}`,},
          }
        );

        setCatalogo([...categorias, response.data]);
        dispatch("PUT_CATEGORIAS", [...categorias, response.data]);
        setNewCatalogo({ id: '', name: '', image: null , descripcion:'' });
        setIsOpenInputs(false);
      } catch (error) {
        alert('Error al agregar la categoría');
      } finally {
        setLoading(false);
      }
    };
  
    const handleEditCatalog = (catalogo) => {
      setEditingCatalogo(catalogo);
      setNewCatalogo({ id: catalogo.id, name: catalogo.name, image: catalogo.image });
    };
  
    const handleSaveEdit = async () => {
      const formData = new FormData();
      formData.append('name', newCatalogo.name);
      formData.append('image', newCatalogo.image);
  
      try {
        setLoading(true);
        const response = await axios.put(`http://localhost:8080/travel/public/categorias/${newCatalogo.id}`, formData);
        const updatedCategory = response.data;
  
        const updatedFeatures = categorias.map((f) =>
          f.id === updatedCategory.id ? updatedCategory : f
        );
        setCatalogo(updatedFeatures);
        dispatch("PUT_CATEGORIAS", updatedFeatures);
        setEditingCatalogo(null);
        setNewCatalogo({ id: '', name: '', image: null });
      } catch (error) {
        alert('Error al editar la categoría');
      } finally {
        setLoading(false);
      }
    };
  
    const handleDeleteFeature = async (featureId) => {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:8080/travel/public/categorias/${featureId}`);
  
        const updatedFeatures = categorias.filter((f) => f.id !== featureId);
        setCatalogo(updatedFeatures);
        dispatch("PUT_CATEGORIAS", updatedFeatures);
      } catch (error) {
        alert('Error al eliminar la categoría');
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
  
    const openModal = () => setIsModalOpen(true);
    const openInputs = () => setIsOpenInputs(!isOpenInputs);
    const closeModal = () => {
      setIsModalOpen(false);
      setIsOpenInputs(false);
      setEditingCatalogo(null);
      setNewCatalogo({ name: '', image: '' });
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
          Categorías
        </button>
        {isModalOpen && (
        <div className="modal-overlay">
            <div className="modal-content model-catalog">
                <div className='header-catalog'>
                <div className='content-title'>

                    <h2 className="text-xl font-bold mb-4 item1">Administrar Categorías</h2>
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
                                placeholder="Nombre de la Categoria"
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
                    {categorias.map((catalogo) => (
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
                      <>
                        <button onClick={handleSaveEdit} className="button-add btn-add item2">
                          Guardar
                        </button>
                        <button onClick={() => handleEditCatalog()} className="button-delete btn-characterist" >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button  onClick={() => handleEditCatalog(catalogo)}  className="button-edit btn-characterist" >
                          Editar
                        </button>
                        <button onClick={() => handleDeleteFeature(catalogo.id)} className="button-delete btn-characterist">
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
              </>   
            )}
            </div>
        </div>
      )}
    </div>
  );
}
