import api from './baseApi';

export const getProducts = async () => {
  const response = await api.get('/travel/public/productos');
  return response.data;
};

export const getProductByID = async (id) => {
    const response = await api.get(`/travel/public/productos/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.post('/travel/public/productos', product,  
    {headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
        }
    },);
    
  return response.data;
};

export const updateProduct = async (id, updatedCategory) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.put(`/travel/public/productos/${id}`, updatedCategory, {headers: {
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

export const deleteProduct = async (id) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.delete(`/travel/public/productos/${id}`, {headers: {
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

