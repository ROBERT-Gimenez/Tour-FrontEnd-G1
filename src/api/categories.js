import api from './baseApi';

// Obtener todas las categorías
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// Obtener una categoría por ID
export const getCategoryByID = async (id) => {
    const response = await api.get(`/travel/public/categorias/${id}`);
    return response.data;
};

// Crear una nueva categoría
export const createCategory = async (category) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  console.log(token)
  const response = await api.post('/travel/public/categorias',category,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Actualizar una categoría existente
export const updateCategory = async (id, updatedCategory) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.put(`/travel/public/categorias/${id}`, updatedCategory, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.delete(`/travel/public/categorias/${id}`, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

