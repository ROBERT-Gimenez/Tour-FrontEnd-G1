import api from './api';

// Obtener todas las categorías
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// Obtener una categoría por ID
export const getCategoryByID = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
};

// Crear una nueva categoría
export const createCategory = async (category) => {
  const token = localStorage.getItem("token");
  const response = await api.post('/categories', category,  
    {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    
  return response.data;
};

// Actualizar una categoría existente
export const updateCategory = async (id, updatedCategory) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`/categories/${id}`, updatedCategory, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`/categories/${id}`, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

