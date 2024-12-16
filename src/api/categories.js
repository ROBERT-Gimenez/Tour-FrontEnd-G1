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
  if (updatedCategory.has("image")) {
    const file = await urlToFile(updatedCategory.get("image"), updatedCategory.get("name"));
    updatedCategory.set("image", file);
  }
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.put(`/travel/public/categorias/${id}`, updatedCategory, {headers: {
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.delete(`/travel/public/categorias/${id}`, {headers: {
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

//CORREGIR LAS POLITICAS DE CORS PARA OBTENER LAS IMAGENES
const urlToFile = async (url, filename) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  const blob = await res.blob(); 
  const file = new File([blob], filename, { type: blob.type });
  return file;
};