import api from './baseApi';

export const getProducts = async () => {
  const response = await api.get('/travel/public/productos');
  return response.data;
};

export const getProductByID = async (id) => {
    const response = await api.get(`/travel/public/productos/${id}`);
    return response.data;
};

export const createProduct = async (category) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.post('/travel/public/productos', category,  
    {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    
  return response.data;
};

export const updateProduct = async (id, updatedCategory) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.put(`/travel/public/productos/${id}`, updatedCategory, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

export const deleteProduct = async (id) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const response = await api.delete(`/travel/public/productos/${id}`, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

