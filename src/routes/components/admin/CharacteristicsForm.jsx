import React, { useEffect, useState } from 'react';
import "./admin.css";
import { useContextGlobal } from '../../../utils/GlobalContext';
import { createFeature, deleteFeature, updateFeature, getFeatures } from '../../../api/caracteristics';
import { handleClick, showErrorAlert, spinner } from '../../../api/alert';

export const CharacteristicsForm = () => {
    const { state, dispatch } = useContextGlobal();
    const [features, setFeatures] = useState([]);
    const [newFeature, setNewFeature] = useState({ id: '', name: '', icon: null });
    const [editingFeature, setEditingFeature] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenInputs, setIsOpenInputs] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        spinner(loading);
    }, [loading]);

    // Cargar características desde la BD al cargar el componente
    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const data = await getFeatures();
                setFeatures(data);
            } catch (error) {
                console.error("Error al obtener características desde la BD:", error);
            }
        };
        fetchFeatures();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setNewFeature({
            ...newFeature,
            [name]: name === 'icon' ? files[0] : value,
        });
    };

    const handleAddFeature = async () => {
        if (!newFeature.name || !(newFeature.icon instanceof File)) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        const isDuplicateName = features.some(
            (feature) => feature?.name === newFeature.name && feature?.id !== newFeature.id
        );
        if (isDuplicateName) {
            showErrorAlert('Ya existe una característica con ese nombre.');
            return;
        }

        const formData = new FormData();
        formData.append('name', newFeature.name);
        formData.append('icon', newFeature.icon);

        try {
            setLoading(true);
            const response = await createFeature(formData);
            setFeatures([...features, response]);
            dispatch("PUT_CARACTERISTICAS", [...features, response]);
            setNewFeature({ id: '', name: '', icon: null });
            setIsOpenInputs(false);
        } catch (error) {
            showErrorAlert('Error al agregar la característica.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFeature = async (featureId) => {
        try {
            setLoading(true);
            await deleteFeature(featureId);
            const updatedFeatures = features.filter((f) => f.id !== featureId);
            setFeatures(updatedFeatures);
            dispatch("PUT_CARACTERISTICAS", updatedFeatures);
        } catch (error) {
            showErrorAlert('Error al eliminar la característica.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveEdit = async () => {
        if (!newFeature.name) {
            alert('El nombre no puede estar vacío.');
            return;
        }

        const formData = new FormData();
        formData.append('name', newFeature.name);
        if (newFeature.icon) {
            formData.append('icon', newFeature.icon);
        }

        try {
            setLoading(true);
            const response = await updateFeature(editingFeature.id, formData);
            const updatedFeatures = features.map((f) =>
                f.id === editingFeature.id ? response : f
            );
            setFeatures(updatedFeatures);
            dispatch("PUT_CARACTERISTICAS", updatedFeatures);
            setEditingFeature(null);
            setNewFeature({ id: '', name: '', icon: null });
        } catch (error) {
            showErrorAlert('Error al editar la característica.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getImageSrc = (icon) => {
        if (icon instanceof File) {
            return URL.createObjectURL(icon);
        }
        return icon;
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsOpenInputs(false);
        setEditingFeature(null);
        setNewFeature({ id: '', name: '', icon: null });
    };

    return (
        <div className="characteristics-form">
            <button onClick={openModal} className="btn-open-characterist">
                Características
            </button>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content model-catalog">
                        <div className='header-catalog'>
                            <div className='content-title'>
                                <h2 className="text-xl font-bold mb-4 item1">Administrar Características</h2>
                                {!isOpenInputs && (
                                    <button onClick={() => setIsOpenInputs(true)} className="button-add btn-add item2">
                                        <i className="fa fa-plus" aria-hidden="true"></i> Añadir caracteristica
                                    </button>
                                )}
                            </div>
                        </div>
                        {isOpenInputs && (
                            <div className='content-catalog-form'>
                                <div className="catalog-form mb-4 item2">
                                    <input
                                        type="text"
                                        name="name"
                                        value={newFeature.name}
                                        onChange={handleInputChange}
                                        placeholder="Nombre"
                                        className="input-field-form"
                                    />
                                    <div className="input-group content-preview-image">
                                        {newFeature.icon && (
                                            <img src={getImageSrc(newFeature.icon)} alt="Ícono seleccionado" className="catalog-image-form" />
                                        )}

                                        <label htmlFor="icon-upload" className="upload-label">
                                            <i className="fa fa-upload" aria-hidden="true"></i> Subir Ícono
                                        </label>

                                        <input
                                            id="icon-upload"
                                            type="file"
                                            name="icon"
                                            onChange={handleInputChange}
                                            accept="image/*"
                                            className="input-image hide-input-image"
                                        />
                                    </div>
                                </div>
                                
                                <div className='content-btns-form'>
                                    <button onClick={() => setIsOpenInputs(false)} className="button-close item1">
                                        Cancelar
                                    </button>
                                    <button onClick={handleAddFeature} className="button-add btn-add">
                                        + agregar
                                    </button>
                                </div>
                            </div>
                        )}
                        {!isOpenInputs && (
                            <ul className="feature-list">
                                {features.map((feature) => (
                                    <li key={feature.id} className="feature-item flex justify-between items-center">
                                        <span>{feature.name}</span>
                                        <img src={feature.icon} alt="Ícono" className="catalog-image" />
                                        <div className="feature-actions flex gap-2">

                                            <button onClick={() => handleEditFeature(feature.id)} className="button-edit btn-add">
                                                Editar
                                            </button>
                                            <button onClick={() => handleDeleteFeature(feature.id)} className="button-delete btn-characterist">
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button onClick={closeModal} className="button-close">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};