import api from './baseApi';

// Obtener todas las propiedades
export const getProperties = async () => {
    const response = await api.get('/properties');
    return response.data;
};

// Obtener una propiedad por ID
export const getPropertyByID = async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
};

// Crear una nueva propiedad
export const createProperty = async (property) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    const response = await api.post('/properties', property, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

// Actualizar una propiedad existente
export const updateProperty = async (id, updatedProperty) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    const response = await api.put(`/properties/${id}`, updatedProperty, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

// Eliminar una propiedad
export const deleteProperty = async (id) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    const response = await api.delete(`/properties/${id}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};
