import api from './baseApi';

// Obtener todas las características
export const getFeatures = async () => {
  const response = await api.get('/travel/public/caracteristicas');
  return response.data;
};

// Obtener una característica por ID
export const getFeatureByID = async (id) => {
  const response = await api.get('/travel/public/caracteristicas/${id}');
  return response.data;
};

// Crear una nueva característica
export const createFeature = async (feature) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  console.log(token);
  const response = await api.post('/travel/public/caracteristicas', feature, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return response.data;
};

// Actualizar una característica existente
export const updateFeature = async (id, updatedFeature) => {
  if (updatedFeature.has("icon")) {
    const file = await urlToFile(updatedFeature.get("icon"), updatedFeature.get("name"));
    updatedFeature.set("icon", file);
  }
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.put(`/travel/public/caracteristicas/${id}`, updatedFeature, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return response.data;
};

// Eliminar una característica
export const deleteFeature = async (id) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.delete(`/travel/public/caracteristicas/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return response.data;
};

// CORREGIR LAS POLÍTICAS DE CORS PARA OBTENER LAS IMÁGENES
const urlToFile = async (url, filename) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log(res);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: blob.type });
  return file;
};